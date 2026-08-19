import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_ACCESS_SECONDS,
  createAdminAccessToken,
  verifyAdminAccessToken,
} from '@/lib/admin-token'

const ADMIN_REFRESH_COOKIE = 'mjk_admin_refresh'
const LEGACY_ADMIN_COOKIE = 'mjk_admin_session'
const REFRESH_SECONDS = 30 * 24 * 60 * 60
const PBKDF2_ITERATIONS = 210000

// Sliding-window login rate limiting (in-memory, per Node process).
// Brute-force protection for /api/admin/login.
const LOGIN_WINDOW_MS = 10 * 60 * 1000
const LOGIN_MAX_ATTEMPTS = 5
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

type AdminSessionTokens = {
  accessToken: string
  refreshToken: string
}

type RefreshTokenMetadata = {
  userAgent?: string | null
  ipAddress?: string | null
}

type StoredRefreshToken = {
  id: string
  family_id: string
  email: string
  token_hash: string
  expires_at: string
  revoked_at: string | null
  replaced_by_hash: string | null
}

function keyForRequest(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export function checkLoginRateLimit(request: Request): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const key = keyForRequest(request)
  const entry = loginAttempts.get(key)

  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

export function resetLoginRateLimit(request: Request) {
  loginAttempts.delete(keyForRequest(request))
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ''
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function text(value: string) {
  return new TextEncoder().encode(value)
}

function secureEqual(left: string, right: string) {
  const leftBytes = text(left)
  const rightBytes = text(right)
  if (leftBytes.length !== rightBytes.length) return false

  let difference = 0
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index]
  }
  return difference === 0
}

async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey('raw', text(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: text(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  )
  return bytesToBase64Url(new Uint8Array(bits))
}

async function hashRefreshToken(token: string) {
  const digest = await crypto.subtle.digest('SHA-256', text(token))
  return bytesToBase64Url(new Uint8Array(digest))
}

function credentialsConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_PASSWORD_SALT &&
      process.env.ADMIN_SESSION_SECRET,
  )
}

function refreshStoreConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function refreshStore(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) throw new Error('Admin refresh-token storage is not configured.')

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  })
}

export function adminAuthConfigured() {
  return credentialsConfigured() && refreshStoreConfigured()
}

export async function validateAdminCredentials(email: string, password: string) {
  if (!credentialsConfigured()) return false

  const configuredEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase()
  if (!secureEqual(email.trim().toLowerCase(), configuredEmail)) return false

  const computed = await passwordHash(password, process.env.ADMIN_PASSWORD_SALT!)
  return secureEqual(computed, process.env.ADMIN_PASSWORD_HASH!)
}

function newOpaqueToken() {
  return bytesToBase64Url(crypto.getRandomValues(new Uint8Array(32)))
}

async function insertRefreshToken(email: string, familyId: string, refreshToken: string, metadata: RefreshTokenMetadata) {
  const expiresAt = new Date(Date.now() + REFRESH_SECONDS * 1000).toISOString()
  const { error } = await refreshStore().from('admin_refresh_tokens').insert({
    family_id: familyId,
    email: email.trim().toLowerCase(),
    token_hash: await hashRefreshToken(refreshToken),
    expires_at: expiresAt,
    user_agent: metadata.userAgent?.slice(0, 512) || null,
    ip_address: metadata.ipAddress?.slice(0, 128) || null,
  })
  if (error) throw new Error('Unable to create admin refresh token.')
}

export async function createAdminSession(email: string, metadata: RefreshTokenMetadata = {}): Promise<AdminSessionTokens> {
  if (!adminAuthConfigured()) throw new Error('Admin authentication is not configured.')

  const refreshToken = newOpaqueToken()
  await insertRefreshToken(email, crypto.randomUUID(), refreshToken, metadata)
  return { accessToken: await createAdminAccessToken(email), refreshToken }
}

async function findRefreshToken(refreshToken: string) {
  const { data, error } = await refreshStore()
    .from('admin_refresh_tokens')
    .select('id, family_id, email, token_hash, expires_at, revoked_at, replaced_by_hash')
    .eq('token_hash', await hashRefreshToken(refreshToken))
    .maybeSingle()

  if (error) throw new Error('Unable to read admin refresh token.')
  return data as StoredRefreshToken | null
}

async function revokeRefreshFamily(familyId: string) {
  const { error } = await refreshStore()
    .from('admin_refresh_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('family_id', familyId)
    .is('revoked_at', null)

  if (error) throw new Error('Unable to revoke admin refresh-token family.')
}

export async function revokeAdminRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken || !refreshStoreConfigured()) return
  const stored = await findRefreshToken(refreshToken)
  if (stored) await revokeRefreshFamily(stored.family_id)
}

export async function rotateAdminSession(refreshToken: string, metadata: RefreshTokenMetadata = {}) {
  if (!adminAuthConfigured()) throw new Error('Admin authentication is not configured.')

  const stored = await findRefreshToken(refreshToken)
  if (!stored) return null

  if (stored.email !== process.env.ADMIN_EMAIL!.trim().toLowerCase()) {
    await revokeRefreshFamily(stored.family_id)
    return null
  }

  const expired = Date.parse(stored.expires_at) <= Date.now()
  if (stored.revoked_at || stored.replaced_by_hash || expired) {
    // A previously-used refresh token is a replay signal. Revoke every token
    // in the family so a stolen token cannot continue the session.
    await revokeRefreshFamily(stored.family_id)
    return null
  }

  const nextRefreshToken = newOpaqueToken()
  const nextHash = await hashRefreshToken(nextRefreshToken)
  await insertRefreshToken(stored.email, stored.family_id, nextRefreshToken, metadata)

  const now = new Date().toISOString()
  const { data: claimed, error } = await refreshStore()
    .from('admin_refresh_tokens')
    .update({ revoked_at: now, replaced_by_hash: nextHash, last_used_at: now })
    .eq('id', stored.id)
    .is('revoked_at', null)
    .is('replaced_by_hash', null)
    .select('id')
    .maybeSingle()

  if (error || !claimed) {
    // Another request won the rotation race. Remove the unused token and
    // revoke the family to make the replay fail closed.
    await refreshStore().from('admin_refresh_tokens').delete().eq('token_hash', nextHash)
    await revokeRefreshFamily(stored.family_id)
    return null
  }

  return { accessToken: await createAdminAccessToken(stored.email), refreshToken: nextRefreshToken }
}

function readCookie(request: Request, name: string) {
  const rawCookie = request.headers.get('cookie') || ''
  return rawCookie
    .split(';')
    .map(item => item.trim())
    .find(item => item.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}

export function readAdminCookie(request: Request) {
  return readCookie(request, ADMIN_ACCESS_COOKIE)
}

export function readAdminRefreshCookie(request: Request) {
  return readCookie(request, ADMIN_REFRESH_COOKIE)
}

export async function isAdminRequest(request: Request) {
  return verifyAdminAccessToken(readAdminCookie(request))
}

// Kept as a compatibility export for existing middleware/tests. New callers
// should use verifyAdminAccessToken so the token type is explicit.
export const verifyAdminSession = verifyAdminAccessToken

type CookieResponse = { cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void } }

const secureCookie = process.env.NODE_ENV === 'production'

export function setAdminSessionCookies(response: CookieResponse, tokens: AdminSessionTokens) {
  response.cookies.set(ADMIN_ACCESS_COOKIE, tokens.accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: secureCookie,
    path: '/',
    maxAge: ADMIN_ACCESS_SECONDS,
    priority: 'high',
  })
  response.cookies.set(ADMIN_REFRESH_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: secureCookie,
    path: '/api/admin',
    maxAge: REFRESH_SECONDS,
    priority: 'high',
  })
}

export function clearAdminSessionCookies(response: CookieResponse) {
  for (const [name, path] of [[ADMIN_ACCESS_COOKIE, '/'], [ADMIN_REFRESH_COOKIE, '/api/admin'], [LEGACY_ADMIN_COOKIE, '/']] as const) {
    response.cookies.set(name, '', {
      httpOnly: true,
      sameSite: 'strict',
      secure: secureCookie,
      path,
      maxAge: 0,
    })
  }
}

export const adminCookie = {
  name: ADMIN_ACCESS_COOKIE,
  maxAge: ADMIN_ACCESS_SECONDS,
}

const ADMIN_COOKIE = 'mjk_admin_session'
const SESSION_SECONDS = 60 * 60 * 12
const PBKDF2_ITERATIONS = 210000

// Sliding-window login rate limiting (in-memory, per Node process).
// Brute-force protection for /api/admin/login.
const LOGIN_WINDOW_MS = 10 * 60 * 1000 // 10 min
const LOGIN_MAX_ATTEMPTS = 5
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

function keyForRequest(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  return ip
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

type AdminSession = {
  email: string
  exp: number
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ''
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4)
  const binary = atob(base64)
  return Uint8Array.from(binary, char => char.charCodeAt(0))
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

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', text(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signed = await crypto.subtle.sign('HMAC', key, text(payload))
  return bytesToBase64Url(new Uint8Array(signed))
}

function credentialsConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_PASSWORD_SALT &&
      process.env.ADMIN_SESSION_SECRET,
  )
}

export function adminAuthConfigured() {
  return credentialsConfigured()
}

export async function validateAdminCredentials(email: string, password: string) {
  if (!credentialsConfigured()) return false

  const configuredEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase()
  if (!secureEqual(email.trim().toLowerCase(), configuredEmail)) return false

  const computed = await passwordHash(password, process.env.ADMIN_PASSWORD_SALT!)
  return secureEqual(computed, process.env.ADMIN_PASSWORD_HASH!)
}

export async function createAdminSession(email: string) {
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  }
  const encoded = bytesToBase64Url(text(JSON.stringify(payload)))
  const signed = await signature(encoded, process.env.ADMIN_SESSION_SECRET!)
  return `${encoded}.${signed}`
}

export async function verifyAdminSession(value: string | undefined) {
  if (!credentialsConfigured() || !value) return false

  const [encoded, providedSignature] = value.split('.')
  if (!encoded || !providedSignature) return false

  const expectedSignature = await signature(encoded, process.env.ADMIN_SESSION_SECRET!)
  if (!secureEqual(providedSignature, expectedSignature)) return false

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encoded))) as AdminSession
    return (
      payload.email === process.env.ADMIN_EMAIL!.trim().toLowerCase() &&
      Number.isFinite(payload.exp) &&
      payload.exp > Math.floor(Date.now() / 1000)
    )
  } catch {
    return false
  }
}

export function readAdminCookie(request: Request) {
  const rawCookie = request.headers.get('cookie') || ''
  return rawCookie
    .split(';')
    .map(item => item.trim())
    .find(item => item.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1)
}

export async function isAdminRequest(request: Request) {
  return verifyAdminSession(readAdminCookie(request))
}

export const adminCookie = {
  name: ADMIN_COOKIE,
  maxAge: SESSION_SECONDS,
}

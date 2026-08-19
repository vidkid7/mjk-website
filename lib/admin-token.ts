export const ADMIN_ACCESS_COOKIE = 'mjk_admin_access'
export const ADMIN_ACCESS_SECONDS = 15 * 60

type AdminAccessPayload = {
  typ: 'access'
  iss: 'mjk-admin'
  aud: 'mjk-admin-panel'
  sub: string
  iat: number
  exp: number
  jti: string
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

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', text(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signed = await crypto.subtle.sign('HMAC', key, text(payload))
  return bytesToBase64Url(new Uint8Array(signed))
}

function tokenConfiguration() {
  return Boolean(process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_SESSION_SECRET)
}

export async function createAdminAccessToken(email: string) {
  if (!tokenConfiguration()) throw new Error('Admin access token is not configured.')

  const now = Math.floor(Date.now() / 1000)
  const payload: AdminAccessPayload = {
    typ: 'access',
    iss: 'mjk-admin',
    aud: 'mjk-admin-panel',
    sub: email.trim().toLowerCase(),
    iat: now,
    exp: now + ADMIN_ACCESS_SECONDS,
    jti: crypto.randomUUID(),
  }
  const encoded = bytesToBase64Url(text(JSON.stringify(payload)))
  return `${encoded}.${await signature(encoded, process.env.ADMIN_SESSION_SECRET!)}`
}

export async function verifyAdminAccessToken(value: string | undefined) {
  if (!tokenConfiguration() || !value) return false

  const [encoded, providedSignature, ...extraParts] = value.split('.')
  if (!encoded || !providedSignature || extraParts.length > 0) return false

  const expectedSignature = await signature(encoded, process.env.ADMIN_SESSION_SECRET!)
  if (!secureEqual(providedSignature, expectedSignature)) return false

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(encoded))) as Partial<AdminAccessPayload>
    const now = Math.floor(Date.now() / 1000)
    return (
      payload.typ === 'access' &&
      payload.iss === 'mjk-admin' &&
      payload.aud === 'mjk-admin-panel' &&
      payload.sub === process.env.ADMIN_EMAIL!.trim().toLowerCase() &&
      Number.isInteger(payload.iat) &&
      Number.isInteger(payload.exp) &&
      typeof payload.jti === 'string' &&
      payload.jti.length >= 16 &&
      payload.iat! <= now + 30 &&
      payload.exp! > now
    )
  } catch {
    return false
  }
}

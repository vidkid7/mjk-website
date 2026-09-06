export type SupabaseJwtClaims = {
  iat?: number
  nbf?: number
  exp?: number
}

// Legacy Supabase service-role JWTs can be generated a few seconds ahead of
// the clock on a serverless runtime. Keep a small tolerance for iat/nbf while
// still rejecting keys that are materially from the future.
export const SUPABASE_JWT_CLOCK_SKEW_SECONDS = 60

function decodeClaims(token: string): SupabaseJwtClaims {
  const segment = token.split('.')[1]
  if (!segment) throw new Error('Supabase server key is not a valid JWT or Supabase API key.')

  try {
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8')) as Record<string, unknown>
    const claims: SupabaseJwtClaims = {}
    for (const name of ['iat', 'nbf', 'exp'] as const) {
      const value = payload[name]
      if (typeof value === 'number' && Number.isFinite(value)) claims[name] = value
    }
    return claims
  } catch {
    throw new Error('Supabase server key is not a valid JWT or Supabase API key.')
  }
}

export function validateSupabaseServerKey(key: string, nowSeconds = Math.floor(Date.now() / 1000)): SupabaseJwtClaims | null {
  const trimmed = key.trim()
  if (!trimmed.startsWith('eyJ')) return null

  const claims = decodeClaims(trimmed)
  const futureCutoff = nowSeconds + SUPABASE_JWT_CLOCK_SKEW_SECONDS
  if (claims.iat !== undefined && claims.iat > futureCutoff) {
    throw new Error(`Supabase server JWT was issued in the future (iat ${claims.iat}, server time ${nowSeconds}). Rotate the server key in Supabase and Vercel.`)
  }
  if (claims.nbf !== undefined && claims.nbf > futureCutoff) {
    throw new Error(`Supabase server JWT is not active yet (nbf ${claims.nbf}, server time ${nowSeconds}). Rotate the server key in Supabase and Vercel.`)
  }
  if (claims.exp !== undefined && claims.exp <= nowSeconds) {
    throw new Error(`Supabase server JWT has expired (exp ${claims.exp}, server time ${nowSeconds}). Rotate the server key in Supabase and Vercel.`)
  }
  return claims
}

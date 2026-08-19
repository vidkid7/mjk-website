import { NextResponse } from 'next/server'
import {
  adminAuthConfigured,
  checkLoginRateLimit,
  createAdminSession,
  resetLoginRateLimit,
  setAdminSessionCookies,
  validateAdminCredentials,
} from '@/lib/admin-auth'

export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin login is not configured.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const rateLimit = checkLoginRateLimit(request)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds), 'Cache-Control': 'no-store' },
      },
    )
  }

  const body = await request.json().catch(() => ({}))
  const email = typeof body.email === 'string' ? body.email : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!(await validateAdminCredentials(email, password))) {
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  // Successful login — clear the rate-limit bucket so lockouts don't persist
  // across password changes or legitimate admin use.
  resetLoginRateLimit(request)

  try {
    const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
    setAdminSessionCookies(response, await createAdminSession(email, {
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    }))
    return response
  } catch {
    return NextResponse.json(
      { error: 'Admin session storage is unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

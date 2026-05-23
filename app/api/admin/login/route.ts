import { NextResponse } from 'next/server'
import { adminAuthConfigured, adminCookie, createAdminSession, validateAdminCredentials } from '@/lib/admin-auth'

export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 })
  }

  const body = await request.json().catch(() => ({}))
  const email = typeof body.email === 'string' ? body.email : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!(await validateAdminCredentials(email, password))) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(adminCookie.name, await createAdminSession(email), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: adminCookie.maxAge,
  })
  return response
}

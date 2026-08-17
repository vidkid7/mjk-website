import { NextResponse } from 'next/server'
import {
  adminAuthConfigured,
  clearAdminSessionCookies,
  readAdminRefreshCookie,
  rotateAdminSession,
  setAdminSessionCookies,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin authentication is not configured.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const refreshToken = readAdminRefreshCookie(request)
  if (!refreshToken) {
    const response = NextResponse.json(
      { error: 'Admin session expired.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    )
    clearAdminSessionCookies(response)
    return response
  }

  try {
    const tokens = await rotateAdminSession(refreshToken, {
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    })
    if (!tokens) {
      const response = NextResponse.json(
        { error: 'Admin session expired.' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } },
      )
      clearAdminSessionCookies(response)
      return response
    }

    const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
    setAdminSessionCookies(response, tokens)
    return response
  } catch {
    const response = NextResponse.json(
      { error: 'Admin session storage is unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
    clearAdminSessionCookies(response)
    return response
  }
}

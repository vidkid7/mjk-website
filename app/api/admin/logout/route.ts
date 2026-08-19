import { NextResponse } from 'next/server'
import {
  clearAdminSessionCookies,
  readAdminRefreshCookie,
  revokeAdminRefreshToken,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  try {
    await revokeAdminRefreshToken(readAdminRefreshCookie(request))
  } catch {
    // Always clear browser credentials even if the revocation store is unavailable.
  }
  clearAdminSessionCookies(response)
  return response
}

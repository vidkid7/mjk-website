import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_ACCESS_COOKIE, verifyAdminAccessToken } from '@/lib/admin-token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const authCookie = request.cookies.get(ADMIN_ACCESS_COOKIE)
    if (!(await verifyAdminAccessToken(authCookie?.value))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

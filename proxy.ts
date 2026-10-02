import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password');
  const isCitizenRoute = pathname.startsWith('/dashboard');
  const isStaffRoute = pathname.startsWith('/staff');
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (!isAuthRoute && !isCitizenRoute && !isStaffRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const accessCookie = req.cookies.get('cf_access')?.value;
  const refreshCookie = req.cookies.get('cf_refresh')?.value;
  
  let accessToken = accessCookie;
  let response = NextResponse.next();

  if (accessCookie) {
    try {
      const decoded = jwtDecode(accessCookie) as any;
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        accessToken = undefined; // Expired
      }
    } catch {
      accessToken = undefined;
    }
  }

  if (!accessToken && refreshCookie) {
    try {
      const refreshRes = await fetch(`${process.env.API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshCookie })
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        if (data.data?.tokens) {
          accessToken = data.data.tokens.accessToken;
          const newRefresh = data.data.tokens.refreshToken;
          
          if (accessToken) {
            response.cookies.set('cf_access', accessToken, {
              httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
              maxAge: ((jwtDecode(accessToken) as any).exp as number) - Math.floor(Date.now() / 1000)
            });
          }
          if (newRefresh) {
            response.cookies.set('cf_refresh', newRefresh, {
               httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
               maxAge: ((jwtDecode(newRefresh) as any).exp as number) - Math.floor(Date.now() / 1000)
            });
          }
        }
      }
    } catch (err) {
      // Silent fail, handled below
    }
  }

  if (!accessToken) {
    if (isAuthRoute) return response; // Allowed to see login page
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', pathname);
    const redirectRes = NextResponse.redirect(loginUrl);
    redirectRes.cookies.delete('cf_access');
    redirectRes.cookies.delete('cf_refresh');
    redirectRes.cookies.delete('cf_role');
    return redirectRes;
  }

  let role = 'CITIZEN';
  try {
    const decoded = jwtDecode<{role: string}>(accessToken);
    role = decoded.role;
  } catch {}

  if (isAuthRoute) {
    let home = '/dashboard';
    if (role === 'STAFF') home = '/staff';
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') home = '/admin';
    return NextResponse.redirect(new URL(home, req.url));
  }

  if (isCitizenRoute && role !== 'CITIZEN') {
    return NextResponse.redirect(new URL(role === 'STAFF' ? '/staff' : '/admin', req.url));
  }
  if (isStaffRoute && role !== 'STAFF') {
    return NextResponse.redirect(new URL(role === 'CITIZEN' ? '/dashboard' : '/admin', req.url));
  }
  if (isAdminRoute && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL(role === 'STAFF' ? '/staff' : '/dashboard', req.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/staff/:path*', '/admin/:path*', '/login', '/register', '/forgot-password'],
};

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

async function handleProxy(req: NextRequest) {
  try {
    const path = new URL(req.url).pathname.replace('/api/proxy', '');
    const searchParams = req.nextUrl.search;
    const backendUrl = `${process.env.API_BASE_URL}${path}${searchParams}`;
    
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('cf_access')?.value;
    const refreshToken = cookieStore.get('cf_refresh')?.value;

    const headers = new Headers(req.headers);
    headers.delete('host');
    headers.delete('cookie');
    
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
      headers.set('X-Forwarded-For', forwardedFor);
    }

    let bodyBuffer;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      bodyBuffer = await req.arrayBuffer();
    }

    let response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body: bodyBuffer,
      redirect: 'manual'
    });

    if (response.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${process.env.API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.data?.tokens) {
          accessToken = refreshData.data.tokens.accessToken;
          const newRefresh = refreshData.data.tokens.refreshToken;
          
          headers.set('Authorization', `Bearer ${accessToken}`);
          response = await fetch(backendUrl, {
            method: req.method,
            headers,
            body: bodyBuffer,
            redirect: 'manual'
          });

          const nextResponse = new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
          
          const secure = process.env.NODE_ENV === 'production';
          
          if (accessToken) {
            const accExp = (jwtDecode(accessToken) as any).exp as number;
            nextResponse.cookies.set('cf_access', accessToken, { httpOnly: true, secure, sameSite: 'lax', maxAge: accExp - Math.floor(Date.now() / 1000) });
          }
          
          if (newRefresh) {
             const refExp = (jwtDecode(newRefresh) as any).exp as number;
             nextResponse.cookies.set('cf_refresh', newRefresh, { httpOnly: true, secure, sameSite: 'lax', maxAge: refExp - Math.floor(Date.now() / 1000) });
          }
          
          return nextResponse;
        }
      }
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;

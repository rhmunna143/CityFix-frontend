import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    
    if (res.ok && data.data?.tokens) {
      const response = NextResponse.json(data);
      const { accessToken, refreshToken } = data.data.tokens;
      const { role } = data.data.user;
      
      const accExp = (jwtDecode(accessToken) as any).exp as number;
      const refExp = (jwtDecode(refreshToken) as any).exp as number;
      const secure = process.env.NODE_ENV === 'production';
      
      response.cookies.set('cf_access', accessToken, { httpOnly: true, secure, sameSite: 'lax', maxAge: accExp - Math.floor(Date.now() / 1000) });
      response.cookies.set('cf_refresh', refreshToken, { httpOnly: true, secure, sameSite: 'lax', maxAge: refExp - Math.floor(Date.now() / 1000) });
      response.cookies.set('cf_role', role, { httpOnly: false, secure, sameSite: 'lax', maxAge: refExp - Math.floor(Date.now() / 1000) });
      
      return response;
    }
    
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

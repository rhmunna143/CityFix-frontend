import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { Role } from '@/types/api';

export interface SessionPayload {
  userId: string;
  role: Role;
  email: string;
  exp: number;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('cf_access')?.value;
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<SessionPayload>(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

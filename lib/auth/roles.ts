import { Role } from '@/types/api';

export function getRoleHome(role: Role): string {
  switch (role) {
    case 'CITIZEN': return '/dashboard';
    case 'STAFF': return '/staff';
    case 'ADMIN':
    case 'SUPER_ADMIN': return '/admin';
    default: return '/login';
  }
}

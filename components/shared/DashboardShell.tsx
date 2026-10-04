"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/lib/api/notifications';

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
}

interface DashboardShellProps {
  children: ReactNode;
  navItems: NavItem[];
}

export function DashboardShell({ children, navItems }: DashboardShellProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const { data: notificationsData } = useQuery({
    queryKey: ['notifications-bell'],
    queryFn: () => getNotifications({ limit: '50' }),
    refetchInterval: 15000,
    enabled: !!user && user.role !== 'SUPER_ADMIN',
  });
  
  const unreadCount = notificationsData?.items.filter(n => !n.isRead).length || 0;

  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      <aside className="hidden md:flex w-64 flex-col bg-background border-r p-4">
        <div className="font-bold text-xl mb-6 px-2">CityFix</div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-14 lg:h-16 flex items-center justify-between border-b bg-background px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg border-border hover:bg-accent transition-colors"
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xs font-medium hidden sm:inline">Back</span>
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {user?.role !== 'SUPER_ADMIN' && (
              <Link href={user?.role === 'CITIZEN' ? '/dashboard/notifications' : user?.role === 'STAFF' ? '/staff/notifications' : '/admin/notifications'} className="relative mr-2">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground cursor-pointer">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
                  )}
                </Button>
              </Link>
            )}
            {user && (
              <Link
                href={
                  user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
                    ? '/admin/profile'
                    : user.role === 'STAFF'
                      ? '/staff/profile'
                      : '/dashboard/profile'
                }
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer"
                title="View Profile"
              >
                <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span>{user.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">{user.name}</span>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={() => logout()} className="cursor-pointer">
              <LogOut className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span className="hidden sm:inline-block">Logout</span>
              <LogOut className="h-4 w-4 sm:hidden" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

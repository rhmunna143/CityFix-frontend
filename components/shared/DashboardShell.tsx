"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Bell } from 'lucide-react';
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
              className="flex items-center gap-2 px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-14 lg:h-16 flex items-center gap-4 border-b bg-background px-4 md:px-8">
          {/* Mobile menu could go here */}
          <div className="ml-auto flex items-center gap-4">
            {user?.role !== 'SUPER_ADMIN' && (
              <Link href={user?.role === 'CITIZEN' ? '/dashboard/notifications' : user?.role === 'STAFF' ? '/staff/notifications' : '/admin/notifications'} className="relative mr-2">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
                  )}
                </Button>
              </Link>
            )}
            <span className="text-sm font-medium hidden sm:inline-block">{user?.name || 'User'}</span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
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

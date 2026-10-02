import { ReactNode } from 'react';
import Link from 'next/link';

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
            <span className="text-sm font-medium">User</span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

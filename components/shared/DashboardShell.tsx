"use client";

import { ReactNode, useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Bell,
  ArrowLeft,
  Menu,
  X,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/lib/api/notifications";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Image from "next/image";
import { cn } from "cn";

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
}

interface DashboardShellProps {
  children: ReactNode;
  navItems: NavItem[];
}

function subscribeSidebar(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSidebarSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem("cityfix_sidebar_collapsed");
    if (saved !== null) return saved === "true";
    return window.innerWidth < 1024;
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function DashboardShell({ children, navItems }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isCollapsedExternal = useSyncExternalStore(
    subscribeSidebar,
    getSidebarSnapshot,
    getServerSnapshot,
  );
  const [collapsedOverride, setCollapsedOverride] = useState<boolean | null>(
    null,
  );
  const isCollapsed = collapsedOverride ?? isCollapsedExternal;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Auto-close mobile drawer when route changes during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Handle mobile drawer body scroll locking & Escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      const handleResize = () => {
        if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleSidebar = () => {
    const next = !isCollapsed;
    try {
      localStorage.setItem("cityfix_sidebar_collapsed", String(next));
    } catch {
      // ignore
    }
    setCollapsedOverride(next);
  };

  const { data: notificationsData } = useQuery({
    queryKey: ["notifications-bell"],
    queryFn: () => getNotifications({ limit: "50" }),
    refetchInterval: 15000,
    enabled: !!user && user.role !== "SUPER_ADMIN",
  });

  const unreadCount =
    notificationsData?.items.filter((n) => !n.isRead).length || 0;

  const getRoleBadge = (role?: string) => {
    if (!role) return "Portal";
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "ADMIN":
        return "Admin Console";
      case "STAFF":
        return "Staff Portal";
      case "CITIZEN":
        return "Citizen Portal";
      default:
        return role;
    }
  };

  const getProfileHref = (role?: string) => {
    if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/profile";
    if (role === "STAFF") return "/staff/profile";
    return "/dashboard/profile";
  };

  const getNotificationsHref = (role?: string) => {
    if (role === "STAFF") return "/staff/notifications";
    if (role === "CITIZEN") return "/dashboard/notifications";
    return "/admin/notifications";
  };

  const isItemActive = (href: string) => {
    if (pathname === href) return true;
    if (href === "/admin" || href === "/dashboard" || href === "/staff") {
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-muted/40 w-full">
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET SIDEBAR (lg & md): Collapsible / Expandable             */}
      {/* ========================================================================= */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-background border-r border-border shrink-0 transition-[width] duration-300 ease-in-out relative z-30 select-none",
          isCollapsed ? "w-[72px] px-3 py-4" : "w-64 p-4",
        )}
      >
        {/* Sidebar Header */}
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-3 pb-3 border-b border-border">
            <Link
              href="/"
              title="CityFix Home"
              className="h-10 w-10 p-1 bg-white dark:bg-card border border-border/60 rounded-xl flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <Image
                src="/mango.png"
                width={36}
                height={36}
                alt="CityFix logo"
                className="h-full w-full object-contain"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg cursor-pointer"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer min-w-0"
            >
              <div className="h-10 w-10 p-1 bg-white dark:bg-card border border-border/60 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src="/mango.png"
                  width={36}
                  height={36}
                  alt="CityFix logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold montecarlo-regular text-3xl tracking-tight text-foreground leading-none">
                  CityFix
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mt-0.5 truncate">
                  {getRoleBadge(user?.role)}
                </span>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg shrink-0 cursor-pointer"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Sidebar Nav Items */}
        <nav className="flex flex-col gap-1.5 my-4 flex-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);

            if (isCollapsed) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className={cn(
                    "group relative flex items-center justify-center h-10 w-10 mx-auto rounded-lg transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                    {item.icon}
                  </span>
                  {/* Floating tooltip on hover */}
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md shadow-md border border-border opacity-0 pointer-events-none -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 z-50 whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 transition-transform duration-150 group-hover:scale-110",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER OVERLAY & MENU (< md)                                      */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer sheet container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-background border-r border-border shadow-2xl flex flex-col p-4 md:hidden transition-transform duration-300 ease-in-out"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              {/* Hamburger menu logo */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="h-10 w-10 p-1 bg-white dark:bg-card border border-border/60 rounded-xl flex items-center justify-center shadow-xs">
                  <Image
                    src="/mango.png"
                    width={36}
                    height={36}
                    alt="CityFix logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-bold montecarlo-regular text-3xl tracking-tight text-foreground leading-none">
                    CityFix
                  </span>

                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mt-0.5">
                    {getRoleBadge(user?.role)}
                  </span>
                </div>
              </Link>

              {/* back button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Nav Items */}
            <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              {user && (
                <Link
                  href={getProfileHref(user.role)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden shrink-0">
                    {user.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span>{user.name?.charAt(0) || "U"}</span>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user.email || getRoleBadge(user.role)}
                    </span>
                  </div>
                </Link>
              )}

              <div className="flex items-center justify-between pt-1">
                <ThemeToggle />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 border-border cursor-pointer gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="h-14 lg:h-16 flex items-center justify-between border-b bg-background px-4 md:px-8 sticky top-0 z-20 backdrop-blur-md bg-background/95">
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg cursor-pointer"
              aria-label="Open navigation menu"
              title="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Back Button */}
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

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Mobile Brand Title */}
            <Link
              href="/"
              className="flex md:hidden items-center gap-1.5 mr-1 cursor-pointer"
            >
              <Image
                src="/mango.png"
                width={26}
                height={26}
                alt="CityFix"
                className="rounded-md"
              />
              <span className="font-bold montecarlo-regular text-2xl tracking-tight text-foreground">
                CityFix
              </span>
            </Link>

            <ThemeToggle />

            {user?.role !== "SUPER_ADMIN" && (
              <>
                <Link
                  href={getNotificationsHref(user?.role)}
                  className="relative mr-1"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-foreground cursor-pointer"
                    title="Notifications"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
                    )}
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <Link
                href={getProfileHref(user.role)}
                className="md:flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer hidden"
                title="View Profile"
              >
                <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden shrink-0">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="Avatar"
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>{user.name?.charAt(0) || "U"}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline-block max-w-[120px] truncate">
                  {user.name}
                </span>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10 hidden md:flex"
              title="Logout"
            >
              <LogOut className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span className="hidden sm:inline-block text-xs font-medium">
                Logout
              </span>
              <LogOut className="h-4 w-4 sm:hidden" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Image from "next/image";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const getDashboardHref = () => {
    if (!user) return "/login?next=/dashboard/complaints/new";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") return "/admin";
    if (user.role === "STAFF") return "/staff";
    return "/dashboard";
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Transparency", href: "/transparency" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="h-12 w-12 p-1 bg-white rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <Image src={"/mango.png"} width={"60"} height={"60"} alt="logo" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold montecarlo-regular text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                CityFix
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-1">
                Civic Action
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          {user ? (
            <Link
              href={getDashboardHref()}
              className={`${buttonVariants({ variant: "default" })} cursor-pointer gap-2 shadow-xs`}
            >
              <span>Go to Dashboard</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={`${buttonVariants({ variant: "ghost", size: "sm" })} cursor-pointer font-medium`}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={`${buttonVariants({ variant: "outline", size: "sm" })} cursor-pointer`}
              >
                Sign Up
              </Link>
              <Link
                href="/login?next=/dashboard/complaints/new"
                className={`${buttonVariants({ variant: "default", size: "sm" })} cursor-pointer shadow-xs gap-1.5`}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Report Issue</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t flex flex-col gap-2">
            {user ? (
              <Link
                href={getDashboardHref()}
                onClick={() => setMobileMenuOpen(false)}
                className={`${buttonVariants({ variant: "default" })} w-full cursor-pointer justify-center`}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login?next=/dashboard/complaints/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${buttonVariants({ variant: "default" })} w-full cursor-pointer justify-center`}
                >
                  Report an Issue
                </Link>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${buttonVariants({ variant: "outline" })} w-full cursor-pointer justify-center`}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${buttonVariants({ variant: "outline" })} w-full cursor-pointer justify-center`}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

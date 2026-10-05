import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 dark:bg-muted/10 text-muted-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-base shadow-xs">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">CityFix</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              The modern municipal incident reporting and resolution platform. Connecting citizens with municipal departments for transparent, accountable, and fast city problem resolution.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-foreground">Municipal Services Operational</span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors cursor-pointer">
                  All Departments
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors cursor-pointer">
                  Roads & Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors cursor-pointer">
                  Waste & Sanitation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors cursor-pointer">
                  Drainage & Sewage
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors cursor-pointer">
                  Permits & Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/transparency" className="hover:text-primary transition-colors cursor-pointer">
                  Public Transparency
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors cursor-pointer">
                  About CityFix
                </Link>
              </li>
              <li>
                <Link href="/login?next=/dashboard/complaints/new" className="hover:text-primary transition-colors cursor-pointer">
                  File a Complaint
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors cursor-pointer">
                  Staff & Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">
                  Citizen Helpline
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Contact & Emergency
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="block text-foreground font-medium">City Operations Desk</span>
                <span className="text-xs">City Hall, 100 Municipal Way</span>
              </li>
              <li>
                <span className="block text-foreground font-medium">Citizen Support</span>
                <span className="text-xs">support@cityfix.local</span>
              </li>
              <li>
                <span className="block text-foreground font-medium">Emergency Line</span>
                <span className="text-xs font-mono font-bold text-primary">311 / +1 (800) 555-CITY</span>
              </li>
              <li className="pt-1">
                <Link href="/contact" className="text-xs text-primary font-medium hover:underline cursor-pointer">
                  Send an Inquiry &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} CityFix Municipal Platform. Built for civic accountability.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors cursor-pointer">Privacy & Data</Link>
            <Link href="/transparency" className="hover:text-primary transition-colors cursor-pointer">SLA Policy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors cursor-pointer">Helpline</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

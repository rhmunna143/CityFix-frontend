import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CityFix - Modern Municipal Issue Reporting & Civic Action Platform",
  description: "Report municipal problems, track real-time department progress with guaranteed SLA timers, and improve your neighborhood with CityFix.",
  openGraph: {
    title: "CityFix - Modern Municipal Civic Action Platform",
    description: "Empowering citizens and municipal departments to fix civic issues with SLA accountability.",
    type: "website",
  },
};

interface PublicStats {
  totalResolved: number;
  avgResolutionHours: number;
  perCategoryCounts?: Record<string, number>;
}

async function getPublicStats(): Promise<PublicStats | null> {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
    const res = await fetch(`${baseUrl}/public/stats`, {
      next: { revalidate: 30 },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const stats = await getPublicStats();

  const totalResolved = stats?.totalResolved ?? 2;
  const avgHours = stats?.avgResolutionHours ? Math.round(stats.avgResolutionHours) : 48;

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-28 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Next-Generation Civic Infrastructure
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Smarter cities start with{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  faster resolutions.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Report road damage, sanitation issues, drainage blocks, or water leaks in 60 seconds. Track real-time department response with guaranteed SLA countdowns.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/login?next=/dashboard/complaints/new"
                  className={`${buttonVariants({ size: "lg" })} h-12 px-6 text-base font-semibold shadow-md cursor-pointer gap-2 w-full sm:w-auto`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Report an Issue Now</span>
                </Link>

                <Link
                  href="/services"
                  className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-6 text-base cursor-pointer gap-2 w-full sm:w-auto`}
                >
                  <span>Explore City Services</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Real-time SLA Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  GPS Map Pinpointing
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Stripe Priority Processing
                </span>
              </div>
            </div>

            {/* Right Column: Live Mock Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl border bg-card p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">Live Incident Resolved</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">REF-84920</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-semibold text-foreground text-base">Damaged Road Surface Repaired</h3>
                  <p className="text-xs text-muted-foreground">Kushtia City Central Road &bull; Roads & Infrastructure</p>
                </div>

                {/* Status Timeline */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-muted/30 rounded-lg p-2">
                  <div>
                    <span className="block text-muted-foreground text-[10px]">Reported</span>
                    <span className="font-medium text-foreground">Oct 2, 09:30</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px]">Assigned</span>
                    <span className="font-medium text-foreground">Oct 2, 10:15</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px]">Completed</span>
                    <span className="font-medium text-emerald-600 font-semibold">Oct 3, 14:00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-muted-foreground">SLA Target: 48h</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                    Resolved in 28.5h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT & STATISTICS STRIP */}
      <section className="py-12 bg-muted/20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary font-mono">{totalResolved}</span>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Problems Resolved
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">{avgHours}h</span>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Avg. Resolution Time
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">5+</span>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Active Departments
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">100%</span>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Audit Accountability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">Simple & Transparent</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              How CityFix resolves municipal complaints
            </p>
            <p className="text-muted-foreground text-base">
              A modern, digitized workflow replacing bureaucratic paperwork with real-time accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-2xl border bg-card p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">1. File with Evidence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take a quick photo, drop a pin on the GPS map, and select the issue category. Your ticket is registered with a unique reference code instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border bg-card p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">2. Department Assignment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The responsible city department dispatches the assignment to a verified municipal technician with an automatic SLA clock running.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border bg-card p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">3. Resolution & Proof</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Field technicians upload resolution notes and photographic proof upon completion. Citizens verify the work and rate the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="py-16 md:py-24 bg-muted/20 border-y px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">Municipal Services</h2>
              <p className="text-3xl font-bold tracking-tight text-foreground">Departments ready to serve</p>
            </div>
            <Link href="/services" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer">
              <span>View all services and categories</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              </div>
              <h3 className="font-semibold text-lg">Roads & Transport</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Potholes, broken asphalt, damaged pavements, and street signage maintenance.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <h3 className="font-semibold text-lg">Waste & Sanitation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Garbage accumulation, illegal dumping, dumpster overflows, and public cleanups.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h3 className="font-semibold text-lg">Drainage & Water</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Blocked roadside drains, waterlogging, leaking mains, and sewage overflow.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/></svg>
              </div>
              <h3 className="font-semibold text-lg">Restoration & Safety</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dangerous tree branches, pest infestation, property restorations, and hazardous structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Make your neighborhood cleaner, safer, and better today.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            It takes less than a minute to file an issue. Every complaint is tracked on public record until resolved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/login?next=/dashboard/complaints/new"
              className={`${buttonVariants({ size: "lg" })} h-12 px-8 text-base font-semibold shadow-md cursor-pointer`}
            >
              File a Complaint
            </Link>
            <Link
              href="/transparency"
              className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-8 text-base cursor-pointer`}
            >
              View Transparency Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

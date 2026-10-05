import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About CityFix - Municipal Innovation & Civic Mission",
  description: "Learn how CityFix transforms municipal problem solving with digital accountability, real-time SLA tracking, and citizen engagement.",
  openGraph: {
    title: "About CityFix - Modern Civic Infrastructure",
    description: "Empowering citizens and municipal teams with digital accountability and SLA transparency.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16 w-full">
      {/* Hero / Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          Our Civic Mission
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Transforming municipal problem solving with modern accountability.
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          CityFix was built to bridge the gap between citizens reporting public infrastructure issues and municipal departments working to resolve them. We replace bureaucratic delays with real-time tracking, transparent SLAs, and photographic proof of resolution.
        </p>
      </div>

      {/* Comparison: The Old Way vs The CityFix Way */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-center">
          The Civic Experience Reimagined
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Old Way */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-destructive font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-destructive/10 flex items-center justify-center text-sm">✕</span>
              Traditional Bureaucracy
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">&bull;</span>
                Paperwork or phone queues with no reference numbers or tracking.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">&bull;</span>
                Zero visibility into which department or technician received the issue.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">&bull;</span>
                Unknown response times and frequent forgotten or lost tickets.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive font-bold">&bull;</span>
                No resolution verification or opportunity for citizen feedback.
              </li>
            </ul>
          </div>

          {/* The CityFix Way */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-sm">✓</span>
              The CityFix Platform
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">&bull;</span>
                Instant 60-second digital filing with GPS coordinates and photographic evidence.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">&bull;</span>
                Automated assignment to verified departmental staff with live status indicators.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">&bull;</span>
                Active SLA countdown timers with supervisor escalation upon breach.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">&bull;</span>
                Verified photographic proof on completion and citizen satisfaction rating.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Our Core Principles
          </h2>
          <p className="text-sm text-muted-foreground">
            Built upon four foundational pillars of civic trust and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border bg-card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold text-base text-foreground">Radical Transparency</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every action, status update, and audit log is permanently recorded on open record to guarantee integrity.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold text-base text-foreground">Enforced SLAs</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Target turnaround windows are public commitments. Departments are held accountable to published SLA deadlines.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold text-base text-foreground">Citizen First</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for accessibility across any device. Mobile-first submission, clear notifications, and simple tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-semibold text-base text-foreground">Technician Tools</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Staff members get streamlined departmental assignment queues, resolution note tools, and direct field coordination.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border bg-muted/20 p-8 md:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Ready to make your neighborhood better?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Join thousands of active residents who report civic problems and help keep our municipal infrastructure in top shape.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login?next=/dashboard/complaints/new"
            className={`${buttonVariants({ size: "default" })} cursor-pointer gap-2`}
          >
            <span>Report a Municipal Issue</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className={`${buttonVariants({ variant: "outline", size: "default" })} cursor-pointer`}
          >
            Contact Municipal Helpdesk
          </Link>
        </div>
      </div>
    </div>
  );
}
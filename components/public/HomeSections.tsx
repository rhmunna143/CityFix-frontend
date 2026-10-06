"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  HoverLiftCard, 
  AnimatedCounter, 
  FloatingBadge 
} from "@/components/public/MotionWrappers";

// Mock incidents for interactive hero showcase
const heroIncidents = [
  {
    id: "REF-84920",
    title: "Damaged Road Surface Repaired",
    location: "Central Avenue & 4th Street",
    department: "Roads & Infrastructure",
    reported: "Oct 2, 09:30",
    assigned: "Oct 2, 10:15",
    completed: "Oct 3, 14:00",
    slaTarget: "48h",
    resolvedIn: "28.5h",
    status: "RESOLVED",
    icon: "road",
  },
  {
    id: "REF-73194",
    title: "Commercial Waste Dump Cleared",
    location: "West Market Plaza Zone B",
    department: "Waste & Sanitation",
    reported: "Oct 3, 07:15",
    assigned: "Oct 3, 07:45",
    completed: "Oct 3, 11:30",
    slaTarget: "24h",
    resolvedIn: "4.2h",
    status: "RESOLVED",
    icon: "trash",
  },
  {
    id: "REF-91823",
    title: "Main Water Line Leak Sealed",
    location: "Riverfront Park Blvd",
    department: "Drainage & Water",
    reported: "Oct 4, 11:00",
    assigned: "Oct 4, 11:20",
    completed: "Oct 4, 15:10",
    slaTarget: "24h",
    resolvedIn: "3.8h",
    status: "RESOLVED",
    icon: "water",
  },
];

// 1. HERO SECTION
export function HomeHero() {
  const [activeIncidentIndex, setActiveIncidentIndex] = useState(0);
  const activeIncident = heroIncidents[activeIncidentIndex];

  return (
    <section className="relative overflow-hidden bg-radial from-primary/10 via-background to-background py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn direction="down" duration={0.4}>
              <FloatingBadge className="inline-flex">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Next-Gen Civic Infrastructure
                </div>
              </FloatingBadge>
            </FadeIn>

            <FadeIn delay={0.1} duration={0.5}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Smarter cities start with{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  faster resolutions.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.5}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Report road damage, sanitation issues, drainage blocks, or water leaks in 60 seconds. Track real-time department progress with guaranteed SLA countdowns.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/login?next=/dashboard/complaints/new"
                  className={`${buttonVariants({ size: "lg" })} h-12 px-7 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer gap-2 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Report an Issue Now</span>
                </Link>

                <Link
                  href="/services"
                  className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-6 text-base cursor-pointer gap-2 w-full sm:w-auto hover:bg-muted/70 transition-all`}
                >
                  <span>Explore City Services</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn delay={0.4} duration={0.5}>
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Real-time SLA Timers
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  GPS Map Pinpointing
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <svg className="h-4 w-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full Public Audit Trail
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Incident Showcase */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.25} direction="left" duration={0.6}>
              <div className="relative mx-auto max-w-md rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md p-6 shadow-2xl space-y-4 hover:border-primary/40 transition-colors">
                {/* Header Switcher */}
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Live Incident Verification
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                    {activeIncident.id}
                  </span>
                </div>

                {/* Details */}
                <motion.div 
                  key={activeIncident.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1.5"
                >
                  <h3 className="font-bold text-foreground text-lg tracking-tight">
                    {activeIncident.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{activeIncident.location} &bull; {activeIncident.department}</span>
                  </p>
                </motion.div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-muted/40 rounded-xl p-2.5 border border-border/50">
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">Reported</span>
                    <span className="font-semibold text-foreground text-xs">{activeIncident.reported}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">Assigned</span>
                    <span className="font-semibold text-foreground text-xs">{activeIncident.assigned}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">Completed</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{activeIncident.completed}</span>
                  </div>
                </div>

                {/* SLA Metric Footer */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>SLA Target: <strong>{activeIncident.slaTarget}</strong></span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                    Resolved in {activeIncident.resolvedIn}
                  </span>
                </div>

                {/* Interactive Incident Selector Tabs */}
                <div className="pt-2 border-t flex items-center justify-between gap-1">
                  <span className="text-[11px] text-muted-foreground font-medium">Sample cases:</span>
                  <div className="flex items-center gap-1">
                    {heroIncidents.map((inc, idx) => (
                      <button
                        key={inc.id}
                        type="button"
                        onClick={() => setActiveIncidentIndex(idx)}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                          activeIncidentIndex === idx
                            ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Case #{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. LIVE STATS STRIP
export function HomeStatsStrip({ totalResolved, avgHours }: { totalResolved: number; avgHours: number }) {
  return (
    <section className="py-12 bg-muted/30 dark:bg-muted/15 border-b relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StaggerItem>
            <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-xs space-y-1 hover:border-primary/30 transition-colors shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary font-mono block">
                <AnimatedCounter target={totalResolved} />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Problems Resolved
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-xs space-y-1 hover:border-primary/30 transition-colors shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono block">
                <AnimatedCounter target={avgHours} suffix="h" />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Avg. Resolution Time
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-xs space-y-1 hover:border-primary/30 transition-colors shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono block">
                <AnimatedCounter target={5} suffix="+" />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Active Departments
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-xs space-y-1 hover:border-primary/30 transition-colors shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block">
                <AnimatedCounter target={100} suffix="%" />
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Audit Accountability
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

// 3. NEW SECTION: LIVE MUNICIPAL PULSE & ACTIVITY FEED
export function LiveMunicipalPulse() {
  const pulseEvents = [
    {
      id: "REF-84920",
      type: "RESOLVED",
      dept: "Roads & Infrastructure",
      desc: "Pothole filled and sealed on Central Avenue",
      time: "12m ago",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      id: "REF-91823",
      type: "IN PROGRESS",
      dept: "Drainage & Water",
      desc: "High-pressure pump clearing stormwater drain",
      time: "25m ago",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      id: "REF-73194",
      type: "RESOLVED",
      dept: "Waste & Sanitation",
      desc: "Bulk debris cleared at West Market Plaza",
      time: "48m ago",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      id: "REF-62049",
      type: "ASSIGNED",
      dept: "Restoration & Safety",
      desc: "Hazardous tree branch inspection team dispatched",
      time: "1h ago",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
  ];

  return (
    <section className="py-8 bg-background border-b overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Live City Action Radar
              </span>
              <span className="text-[11px] text-muted-foreground hidden md:inline">
                &bull; Real-time municipal field crew dispatch
              </span>
            </div>
            <Link
              href="/transparency"
              className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Open Audit Logs</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pulseEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/40 transition-colors space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-foreground">{evt.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${evt.badgeColor}`}>
                    {evt.type}
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px] line-clamp-1">
                  {evt.desc}
                </p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span>{evt.dept}</span>
                  <span className="font-mono">{evt.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. HOW IT WORKS 3-PHASE GUIDE
export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "1. File with Evidence",
      description: "Take a photo, drop a pin on the GPS map, and select the issue category. Your ticket is registered with a unique reference code instantly.",
      badge: "60-Second Report",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      ),
    },
    {
      step: 2,
      title: "2. Department Assignment",
      description: "The responsible city department dispatches the assignment to a verified municipal technician with an automatic SLA clock running.",
      badge: "Automated Dispatch",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
    },
    {
      step: 3,
      title: "3. Resolution & Proof",
      description: "Field technicians upload resolution notes and photographic proof upon completion. Citizens verify the work and rate the service.",
      badge: "Citizen Verified",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Simple & Transparent
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How CityFix resolves municipal complaints
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            A modern, digitized workflow replacing bureaucratic paperwork with real-time accountability.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <StaggerItem key={s.step}>
              <HoverLiftCard className="h-full">
                <div className="relative h-full rounded-2xl border bg-card p-7 space-y-4 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shadow-xs">
                        {s.icon}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/50 text-xs font-semibold text-primary flex items-center gap-1">
                    <span>Phase 0{s.step}</span>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// 5. NEW SECTION: BEFORE & AFTER RESOLUTION SHOWCASE
export function BeforeAfterShowcase() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      title: "Dangerous Crater Pothole & Road Hazard",
      location: "Kushtia City Central Road &bull; Ward 4",
      department: "Roads & Infrastructure",
      resolvedTime: "28.5 Hours",
      rating: "5.0 ★★★★★",
      before: {
        condition: "Severe 18-inch asphalt depression causing vehicle rim damage and pedestrian hazard.",
        status: "High Priority Defect",
        label: "Before CityFix Intervention",
      },
      after: {
        condition: "Cold-mix asphalt leveling, compacted steam-roller seal, and reflective road markings restored.",
        status: "Photographically Verified",
        label: "After Municipal Completion",
      },
    },
    {
      title: "Illegal Bulk Trash Accumulation",
      location: "West Market Pedestrian Zone B",
      department: "Waste & Sanitation",
      resolvedTime: "4.2 Hours",
      rating: "4.9 ★★★★★",
      before: {
        condition: "Overfilled commercial dumpster with hazardous organic waste and broken glass spill.",
        status: "Sanitary Hazard",
        label: "Before CityFix Intervention",
      },
      after: {
        condition: "Hydraulic compactor dispatch, sidewalk sanitization wash, and secondary collection bin installed.",
        status: "Sanitized & Verified",
        label: "After Municipal Completion",
      },
    },
    {
      title: "Stormwater Drain Clog & Waterlogging",
      location: "Riverfront Park Blvd & Sump Gate",
      department: "Drainage & Water",
      resolvedTime: "3.8 Hours",
      rating: "5.0 ★★★★★",
      before: {
        condition: "Submerged roadside gutter causing 6-inch street water accumulation and traffic standstill.",
        status: "Flood Risk Alert",
        label: "Before CityFix Intervention",
      },
      after: {
        condition: "Vacuum sucker truck cleared silt buildup; reinforced anti-clog steel grating installed.",
        status: "Drainage Flow Restored",
        label: "After Municipal Completion",
      },
    },
  ];

  const current = cases[selectedCase];

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Measurable Civic Impact
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Before & After Field Resolutions
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every ticket requires photo proof and supervisor inspection before being marked resolved.
          </p>
        </FadeIn>

        {/* Case Selector Pills */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {cases.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedCase(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCase === idx
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Case #{idx + 1}: {c.department.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <FadeIn delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-3xl border bg-card/90 backdrop-blur-md p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {current.title}
                </h3>
                <p className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: current.location }} />
              </div>

              {/* Before / After Toggle Buttons */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("before")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "before"
                      ? "bg-destructive text-destructive-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("after")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "after"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  After (Fixed)
                </button>
              </div>
            </div>

            {/* Condition Content with Smooth Animation */}
            <AnimatePresence mode="wait">
              {activeTab === "before" ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-destructive flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-destructive" />
                      {current.before.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-[11px] font-semibold">
                      {current.before.status}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                    &ldquo;{current.before.condition}&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {current.after.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                      {current.after.status}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                    &ldquo;{current.after.condition}&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resolution Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Turnaround Speed
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {current.resolvedTime}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Responsible Team
                </span>
                <span className="font-semibold text-foreground text-xs line-clamp-1">
                  {current.department}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Citizen Rating
                </span>
                <span className="font-semibold text-amber-500 text-xs">
                  {current.rating}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// 6. CORE SERVICES OVERVIEW
export function HomeServicesGrid() {
  const services = [
    {
      title: "Roads & Transport",
      description: "Potholes, broken asphalt, damaged pavements, and street signage maintenance.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      ),
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Waste & Sanitation",
      description: "Garbage accumulation, illegal dumping, dumpster overflows, and public cleanups.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      ),
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Drainage & Water",
      description: "Blocked roadside drains, waterlogging, leaking mains, and sewage overflow.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      ),
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Restoration & Safety",
      description: "Dangerous tree branches, pest infestation, property restorations, and hazardous structures.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
        </svg>
      ),
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <FadeIn className="space-y-2">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
              Municipal Services
            </h2>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              Departments ready to serve
            </p>
          </FadeIn>
          <FadeIn direction="left" delay={0.1}>
            <Link 
              href="/services" 
              className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 cursor-pointer group"
            >
              <span>View all services and categories</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => (
            <StaggerItem key={item.title}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-3 h-full shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-primary">
                    <Link href="/services" className="hover:underline flex items-center gap-1">
                      <span>Explore issues</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// 7. NEW SECTION: DEPARTMENT ACCOUNTABILITY LEADERBOARD
export function DepartmentEfficiencyLeaderboard() {
  const depts = [
    {
      name: "Roads & Infrastructure",
      onTimeRate: 98.4,
      avgSpeed: "28.5h",
      targetSla: "48h",
      rating: "4.9",
    },
    {
      name: "Waste & Sanitation",
      onTimeRate: 99.2,
      avgSpeed: "4.2h",
      targetSla: "24h",
      rating: "4.8",
    },
    {
      name: "Drainage & Water",
      onTimeRate: 98.7,
      avgSpeed: "3.8h",
      targetSla: "24h",
      rating: "4.9",
    },
    {
      name: "Restoration & Safety",
      onTimeRate: 97.5,
      avgSpeed: "14.5h",
      targetSla: "48h",
      rating: "4.8",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Public Performance Index
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Department SLA Accountability Index
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Live compliance metrics continuously updated through our automated SLA watchdog.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {depts.map((d) => (
            <StaggerItem key={d.name}>
              <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-xs space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground">{d.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {d.onTimeRate}% On-Time
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.onTimeRate}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2 rounded-lg bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">Target SLA</span>
                    <span className="font-bold font-mono text-foreground">{d.targetSla}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">Avg. Speed</span>
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{d.avgSpeed}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">Citizen Score</span>
                    <span className="font-bold text-amber-500">{d.rating} ★</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// 8. NEW SECTION: VERIFIED CITIZEN TESTIMONIALS
export function CitizenTestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Thorne",
      role: "Ward 4 Resident",
      neighborhood: "Central Avenue",
      issue: "Deep Roadway Pothole",
      quote: "Reported a deep pothole that had broken two car suspensions on our street. CityFix dispatched a repair crew in under 24 hours with before/after photo confirmation.",
      time: "Resolved in 28h",
    },
    {
      name: "Dr. Fatima Khan",
      role: "Community Health Director",
      neighborhood: "West Riverfront",
      issue: "Overflowing Stormwater Sump",
      quote: "Our intersection was prone to severe monsoon waterlogging. With CityFix, we tracked the drainage suction truck on the GPS map. Truly transparent municipal work.",
      time: "Resolved in 4h",
    },
    {
      name: "David Chen",
      role: "Merchant Guild President",
      neighborhood: "Downtown Market",
      issue: "Commercial Dumpster Clearance",
      quote: "The Stripe priority processing option was a lifesaver before our annual street festival. The issue was expedited and cleaned within 4 hours. Extraordinary service.",
      time: "Expedited in 3.5h",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Community Voices
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Trusted by active citizens across our city
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Real feedback from neighborhood residents holding public departments accountable.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <StaggerItem key={idx}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-4 h-full shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        ★★★★★
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {t.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-foreground block">{t.name}</span>
                      <span className="text-[10px] text-muted-foreground">{t.role} &bull; {t.neighborhood}</span>
                    </div>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// 9. NEW SECTION: SMART CIVIC APP & MOBILE FEATURES
export function MobileAppExperienceSection() {
  const features = [
    {
      title: "1-Tap GPS Geotagging",
      desc: "Pinpoint issue coordinates instantly on the interactive map without typing complex addresses.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      title: "Direct Photographic Evidence",
      desc: "Take camera photos directly from your phone. Technicians must provide matching resolution photos.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
        </svg>
      ),
    },
    {
      title: "Real-Time Notifications",
      desc: "Instant status updates when staff is assigned, work is in progress, or completion notes are published.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
    {
      title: "Automated Escalation Watchdog",
      desc: "If any department breaches its target turnaround window, the issue automatically escalates to supervisors.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <FadeIn>
              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Mobile-First Convenience
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Civic action in your pocket. Anywhere, anytime.
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  CityFix is optimized for swift mobile access. No confusing paper trails or bureaucratic waiting queues. Just report, track, and verify.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((f, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="p-4 rounded-xl border bg-card space-y-2 shadow-xs">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <FadeIn direction="left" delay={0.2}>
              <div className="mx-auto max-w-sm rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                      CF
                    </div>
                    <span className="font-bold text-sm text-foreground">CityFix Dispatch</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                    Live Watchdog Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                    GPS Coordinates Locked
                  </span>
                  <div className="font-mono text-xs font-semibold text-foreground">
                    23.9015° N, 89.1204° E
                  </div>
                  <p className="text-xs text-muted-foreground">Kushtia City Central Road &bull; Sector 2</p>
                </div>

                {/* Animated simulated notification toast */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 flex items-center gap-3"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      Technician Dispatched
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ETA: 18 mins &bull; Guaranteed SLA 48h
                    </span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// 10. NEW SECTION: INTERACTIVE HOMEPAGE FAQ ACCORDION
export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const homeFaqs = [
    {
      q: "Is reporting an issue on CityFix completely free?",
      a: "Yes! Filing standard municipal complaints (potholes, sanitation, water leaks, traffic lights) is completely free for all citizens. Optional priority fees exist only for expedited turnaround processing or special permit requests.",
    },
    {
      q: "How do I know my complaint won't be forgotten?",
      a: "Every ticket generates an immutable audit record and an automated SLA countdown timer. Department directors receive automated escalation alerts if any issue is not resolved within its published turnaround deadline.",
    },
    {
      q: "What proof is provided when an issue is fixed?",
      a: "Field technicians must upload photographic proof of completion and detailed resolution notes. You will receive an instant notification and can review, rate, or reopen the ticket if unsatisfied.",
    },
    {
      q: "How does the CityFix Civic AI Assistant help?",
      a: "Our integrated AI Assistant is available 24/7 in the bottom-right corner of the screen to guide you on reporting, suggest the appropriate city department, explain turnaround times, or track ticket status.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <FadeIn className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Common Inquiries
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Everything you need to know about municipal reporting and SLA accountability.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl border bg-card/80 backdrop-blur-xs overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base text-foreground tracking-tight">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 11. CALL TO ACTION BANNER
export function HomeCtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden border-t">
      <div className="absolute inset-0 bg-radial from-primary/10 to-transparent pointer-events-none" />
      <FadeIn className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Make your neighborhood cleaner, safer, and better today.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          It takes less than a minute to file an issue. Every complaint is tracked on public record until resolved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/login?next=/dashboard/complaints/new"
            className={`${buttonVariants({ size: "lg" })} h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all`}
          >
            File a Complaint
          </Link>
          <Link
            href="/transparency"
            className={`${buttonVariants({ variant: "outline", size: "lg" })} h-12 px-8 text-base cursor-pointer hover:bg-muted/70 transition-all`}
          >
            View Transparency Portal
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

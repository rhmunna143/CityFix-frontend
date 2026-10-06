"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  HoverLiftCard, 
  FloatingBadge 
} from "@/components/public/MotionWrappers";

export function AboutClient() {
  const principles = [
    {
      num: 1,
      title: "Radical Transparency",
      description: "Every action, status update, and audit log is permanently recorded on open record to guarantee municipal integrity and public trust.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
      ),
    },
    {
      num: 2,
      title: "Enforced SLAs",
      description: "Target turnaround windows are public commitments. Departments are held accountable to published SLA deadlines with supervisor escalation.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      num: 3,
      title: "Citizen First",
      description: "Designed for accessibility across any device. Mobile-first submission, clear email and dashboard notifications, and transparent tracking.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      num: 4,
      title: "Technician Empowerment",
      description: "Staff members receive streamlined departmental queues, mobile resolution tools, photographic verification, and direct field coordination.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Grassroots Civic Hackathon",
      desc: "Conceived as an open-source prototype to replace lost paper forms and unresponsive telephone lines in Ward 4.",
      badge: "Inception",
    },
    {
      year: "2025",
      title: "Municipal Council Partnership",
      desc: "Adopted by the Department of Roads and Public Works, reducing average pothole turnaround time from 14 days to 48 hours.",
      badge: "Department Pilot",
    },
    {
      year: "2026",
      title: "Citywide Smart Governance",
      desc: "Integrated with live GPS geotagging, automated SLA watchdog timers, mobile field verification, and open transparency ledger.",
      badge: "Full Scale",
    },
  ];

  const team = [
    {
      name: "Farhan Hossain",
      role: "Lead Civic Technologist",
      bio: "Advocating for digital public infrastructure and frictionless government accountability.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Systems Architecture",
      bio: "Architecting real-time event pipelines, SLA watchdog timers, and immutable audit logs.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Michael Chen",
      role: "Director of Municipal Field Ops",
      bio: "Bridging the gap between field technicians, dispatch equipment, and on-site photo proofs.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Amira Hassan",
      role: "Citizen Rights & Accessibility",
      bio: "Ensuring every resident, regardless of digital familiarity, can easily file and track issues.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="space-y-16 w-full">
      {/* 1. Hero / Header */}
      <div className="space-y-4 max-w-3xl">
        <FadeIn direction="down" duration={0.4}>
          <FloatingBadge className="inline-flex">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Our Civic Mission
            </div>
          </FloatingBadge>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.5}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Transforming municipal problem solving with{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              modern accountability.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.5}>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            CityFix was built to bridge the gap between citizens reporting public infrastructure issues and municipal departments working to resolve them. We replace bureaucratic delays with real-time tracking, transparent SLAs, and photographic proof of resolution.
          </p>
        </FadeIn>
      </div>

      {/* 2. Visual Civic Mission Photo Banner */}
      <FadeIn delay={0.15}>
        <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl h-72 sm:h-88 group">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
            alt="Modern Civic Center Architecture"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Civic Infrastructure Evolution
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              A Platform Built for the Public Good
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              We envision cities where public infrastructure is continuously maintained, municipal departments operate transparently, and every resident feels empowered to make their neighborhood better.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* 3. Comparison: The Old Way vs The CityFix Way */}
      <div className="space-y-6">
        <FadeIn>
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              The Civic Experience Reimagined
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A side-by-side comparison of traditional municipal reporting versus CityFix.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Old Way */}
          <FadeIn direction="right" delay={0.15}>
            <div className="rounded-2xl border border-destructive/25 bg-destructive/5 dark:bg-destructive/10 p-6 md:p-8 space-y-4 h-full shadow-xs">
              <div className="flex items-center gap-2.5 text-destructive font-bold text-lg">
                <span className="h-7 w-7 rounded-full bg-destructive/15 flex items-center justify-center text-sm font-bold">
                  ✕
                </span>
                Traditional Bureaucracy
              </div>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold mt-0.5">&bull;</span>
                  <span>Paperwork, physical forms, or busy phone queues with no reference numbers or tracking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold mt-0.5">&bull;</span>
                  <span>Zero visibility into which department, division, or technician received the issue.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold mt-0.5">&bull;</span>
                  <span>Unknown response times and frequent forgotten or lost tickets without notification.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold mt-0.5">&bull;</span>
                  <span>No resolution verification, photo proof, or opportunity for citizen review and rating.</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* The CityFix Way */}
          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-2xl border border-primary/35 bg-primary/5 dark:bg-primary/10 p-6 md:p-8 space-y-4 h-full shadow-xs">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg">
                <span className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                The CityFix Platform
              </div>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold mt-0.5">&bull;</span>
                  <span>Instant 60-second digital filing with GPS coordinates and photographic evidence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold mt-0.5">&bull;</span>
                  <span>Automated assignment to verified departmental staff with live status indicators.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold mt-0.5">&bull;</span>
                  <span>Active SLA countdown timers with supervisor escalation upon breach.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-bold mt-0.5">&bull;</span>
                  <span>Verified photographic proof on completion and citizen satisfaction rating.</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 4. Evolution Timeline */}
      <div className="space-y-8">
        <FadeIn className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Our Journey & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            How CityFix grew from a neighborhood initiative to a full municipal platform.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <HoverLiftCard key={idx} className="h-full">
              <div className="p-6 rounded-2xl border bg-card space-y-3 h-full shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-primary">{m.year}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-foreground">{m.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </HoverLiftCard>
          ))}
        </div>
      </div>

      {/* 5. Core Principles */}
      <div className="space-y-8">
        <FadeIn className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Our Core Principles
          </h2>
          <p className="text-sm text-muted-foreground">
            Built upon four foundational pillars of civic trust, technology, and transparency.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <StaggerItem key={p.num}>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card space-y-3 h-full shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
                      {p.icon}
                    </div>
                    <h3 className="font-bold text-base text-foreground tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-primary">
                    Principle 0{p.num}
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* 6. Leadership & Engineering Team */}
      <div className="space-y-8">
        <FadeIn className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineering & Civic Leadership
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            The civic technologists and public infrastructure engineers behind CityFix.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, idx) => (
            <HoverLiftCard key={idx} className="h-full">
              <div className="p-5 rounded-2xl border bg-card space-y-3 h-full shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border/80 mx-auto">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center space-y-0.5">
                    <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                    <span className="text-[11px] font-semibold text-primary block">{t.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </div>
            </HoverLiftCard>
          ))}
        </div>
      </div>

      {/* 7. Bottom CTA Card */}
      <FadeIn>
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-background to-primary/5 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Ready to experience next-generation civic service?
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Join thousands of active citizens and municipal technicians working together for a cleaner, safer city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/login?next=/dashboard/complaints/new"
              className={`${buttonVariants({ size: "default" })} cursor-pointer gap-2 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-transform`}
            >
              <span>Report an Issue</span>
            </Link>
            <Link
              href="/services"
              className={`${buttonVariants({ variant: "outline", size: "default" })} cursor-pointer`}
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

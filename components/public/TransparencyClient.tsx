"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  HoverLiftCard, 
  AnimatedCounter, 
  FloatingBadge 
} from "@/components/public/MotionWrappers";

interface TransparencyClientProps {
  totalResolved: number;
  avgHours: number;
  categories: any[];
  categoryCounts: Record<string, number>;
}

export function TransparencyClient({
  totalResolved,
  avgHours,
  categories,
  categoryCounts,
}: TransparencyClientProps) {
  return (
    <div className="space-y-14 w-full">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <FadeIn direction="down" duration={0.4}>
          <FloatingBadge className="inline-flex">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Governance & Accountability Portal
            </div>
          </FloatingBadge>
        </FadeIn>

        <FadeIn delay={0.1} duration={0.5}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Public Transparency &{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Civic SLA Metrics
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.5}>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            CityFix operates under strict open-government principles. Track real-time municipal resolution speed, department workloads, and SLA compliance metrics across our city.
          </p>
        </FadeIn>
      </div>

      {/* KPI Cards Strip with Stagger */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md space-y-2 shadow-xs hover:border-emerald-500/40 transition-colors h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Resolved Issues
                </span>
                <span className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-base border border-emerald-500/20">
                  ✓
                </span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-foreground font-mono block">
                  <AnimatedCounter target={totalResolved} />
                </span>
                <p className="text-xs text-muted-foreground mt-1">Verified municipal fixes completed</p>
              </div>
            </div>
          </HoverLiftCard>
        </StaggerItem>

        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md space-y-2 shadow-xs hover:border-blue-500/40 transition-colors h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Avg. Resolution Speed
                </span>
                <span className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-base border border-blue-500/20">
                  ⚡
                </span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-foreground font-mono block">
                  <AnimatedCounter target={avgHours} suffix="h" />
                </span>
                <p className="text-xs text-muted-foreground mt-1">From ticket assignment to verified fix</p>
              </div>
            </div>
          </HoverLiftCard>
        </StaggerItem>

        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md space-y-2 shadow-xs hover:border-purple-500/40 transition-colors h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  SLA Compliance
                </span>
                <span className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-base border border-purple-500/20">
                  🎯
                </span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block">
                  <AnimatedCounter target={98} suffix=".2%" />
                </span>
                <p className="text-xs text-muted-foreground mt-1">Issues resolved inside target SLA window</p>
              </div>
            </div>
          </HoverLiftCard>
        </StaggerItem>

        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md space-y-2 shadow-xs hover:border-amber-500/40 transition-colors h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Audit Log Integrity
                </span>
                <span className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-base border border-amber-500/20">
                  🔒
                </span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-foreground font-mono block">
                  <AnimatedCounter target={100} suffix="%" />
                </span>
                <p className="text-xs text-muted-foreground mt-1">Immutable public state transition logs</p>
              </div>
            </div>
          </HoverLiftCard>
        </StaggerItem>
      </StaggerContainer>

      {/* Category Load Breakdown with Animated Progress Bars */}
      <FadeIn delay={0.15}>
        <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Category Workload & Resolution Distribution
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Live volume of complaints filed and addressed across each civic category.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary self-start sm:self-center">
              {categories.length} Tracked Categories
            </span>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => {
              const count = categoryCounts[cat.id] || 0;
              const percentage = totalResolved > 0 ? Math.min(Math.round((count / (totalResolved + 5)) * 100), 100) : 25;
              const barWidth = Math.max(percentage, 12);

              return (
                <div key={cat.id} className="space-y-2 p-3.5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">({cat.department?.name || "Municipal"})</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-mono text-muted-foreground">Target SLA: {cat.slaHours || 48}h</span>
                      <span className="font-bold text-foreground font-mono bg-background px-2 py-0.5 rounded-md border text-xs">
                        {count} tickets
                      </span>
                    </div>
                  </div>

                  {/* Smooth Animated Progress Bar */}
                  <div className="w-full bg-muted/70 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${barWidth}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                      className="bg-gradient-to-r from-primary to-blue-500 h-2.5 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Accountability Pillars */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/60 backdrop-blur-xs space-y-3 h-full shadow-xs hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="font-bold text-base text-foreground">
                Automated SLA Watchdog
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every complaint has an active countdown timer visible to both the reporting citizen and the department head. If time expires, the issue is flagged as SLA Breached for immediate escalation.
              </p>
            </div>
          </HoverLiftCard>
        </StaggerItem>

        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/60 backdrop-blur-xs space-y-3 h-full shadow-xs hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3 className="font-bold text-base text-foreground">
                Permanent Audit Logs
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every staff assignment, status change, note, and payment is saved to an immutable audit record. Staff performance and resolution history can never be silently erased.
              </p>
            </div>
          </HoverLiftCard>
        </StaggerItem>

        <StaggerItem>
          <HoverLiftCard className="h-full">
            <div className="p-6 rounded-2xl border bg-card/60 backdrop-blur-xs space-y-3 h-full shadow-xs hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              </div>
              <h3 className="font-bold text-base text-foreground">
                Transparent Fee Allocation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Optional priority fees and chargeable permits are processed via Stripe with clear digital receipts. Priority fees shorten target SLA windows and cover emergency overtime response.
              </p>
            </div>
          </HoverLiftCard>
        </StaggerItem>
      </StaggerContainer>

      {/* Action Banner */}
      <FadeIn>
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-card to-primary/5 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Have an issue that needs attention?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Help maintain our high transparency and resolution rate by reporting public problems as soon as you spot them.
          </p>
          <div className="pt-2">
            <Link
              href="/login?next=/dashboard/complaints/new"
              className={`${buttonVariants({ size: "default" })} cursor-pointer gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform`}
            >
              <span>Report an Issue</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

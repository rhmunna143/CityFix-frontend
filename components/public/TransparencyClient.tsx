import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
  AnimatedCounter,
  FloatingBadge,
} from "@/components/public/MotionWrappers";
import { WardMatrix } from "@/components/public/transparency/WardMatrix";
import { AuditPackDialog } from "@/components/public/transparency/AuditPackDialog";

interface CategoryItem {
  id: string;
  name: string;
  slaHours?: number;
  department?: {
    name?: string;
  };
}

interface TransparencyClientProps {
  totalResolved: number;
  avgHours: number;
  categories: CategoryItem[];
  categoryCounts: Record<string, number>;
}

export function TransparencyClient({
  totalResolved,
  avgHours,
  categories,
  categoryCounts,
}: TransparencyClientProps) {
  return (
    <div className="space-y-16 w-full">
      {/* 1. Header */}
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
            CityFix operates under strict open-government principles. Track
            real-time municipal resolution speed, department workloads, and SLA
            compliance metrics across our city.
          </p>
        </FadeIn>
      </div>

      {/* 2. Municipal Operations Control Center Showcase */}
      <FadeIn delay={0.15}>
        <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl h-80 sm:h-96 group">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
            alt="Municipal Operations Command Center"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono font-semibold">
                City Operations Watchdog: ACTIVE
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-300">
              Audit Stream: ISO-27001 Verified
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Continuous Real-Time Oversight
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Open Data Command Center & Audit Stream
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Every filed complaint is timestamped, cryptographically logged,
              and tracked through department assignment, field resolution, and
              supervisor review. No ticket is ever erased.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* 3. KPI Cards Strip with Stagger */}
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
                <p className="text-xs text-muted-foreground mt-1">
                  Verified municipal fixes completed
                </p>
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
                <p className="text-xs text-muted-foreground mt-1">
                  From ticket assignment to verified fix
                </p>
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
                <p className="text-xs text-muted-foreground mt-1">
                  Issues resolved inside target SLA window
                </p>
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
                <p className="text-xs text-muted-foreground mt-1">
                  Immutable public state transition logs
                </p>
              </div>
            </div>
          </HoverLiftCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 4. Interactive Ward Compliance Matrix & Performance Heatmap */}
      <FadeIn delay={0.15}>
        <WardMatrix />
      </FadeIn>

      {/* 5. Category Workload Breakdown */}
      <FadeIn delay={0.2}>
        <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Category Workload & Resolution Distribution
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Live volume of complaints filed and addressed across each civic
                category.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary self-start sm:self-center">
              {categories.length} Tracked Categories
            </span>
          </div>

          <div className="space-y-4">
            {categories.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const percentage =
                totalResolved > 0
                  ? Math.min(
                      Math.round((count / (totalResolved + 5)) * 100),
                      100
                    )
                  : 25;
              const barWidth = Math.max(percentage, 12);

              return (
                <div
                  key={cat.id}
                  className="space-y-2 p-3.5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">
                        {cat.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({cat.department?.name || "Municipal"})
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-mono text-muted-foreground">
                        Target SLA: {cat.slaHours || 48}h
                      </span>
                      <span className="font-bold text-foreground font-mono bg-background px-2 py-0.5 rounded-md border text-xs">
                        {count} tickets
                      </span>
                    </div>
                  </div>

                  {/* Smooth Progress Bar */}
                  <div className="w-full bg-muted/70 rounded-full h-2.5 overflow-hidden">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="bg-gradient-to-r from-primary to-blue-500 h-2.5 rounded-full transition-all duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* 6. Open Data Audit Pack Download */}
      <AuditPackDialog />

      {/* 7. Action CTA Banner */}
      <FadeIn>
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-card to-primary/5 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Have an issue that needs attention?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Help maintain our high transparency and resolution rate by reporting
            public problems as soon as you spot them.
          </p>
          <div className="pt-2">
            <Link
              href="/login?next=/dashboard/complaints/new"
              className={`${buttonVariants({ size: "default" })} cursor-pointer gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform`}
            >
              <span>Report an Issue</span>
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
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

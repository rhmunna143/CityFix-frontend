import {
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/components/public/MotionWrappers";

export function HomeStatsStrip({
  totalResolved,
  avgHours,
}: {
  totalResolved: number;
  avgHours: number;
}) {
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

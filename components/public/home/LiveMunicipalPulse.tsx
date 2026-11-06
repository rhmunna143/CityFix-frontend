import Link from "next/link";
import { FadeIn } from "@/components/public/MotionWrappers";

const pulseEvents = [
  {
    id: "REF-84920",
    type: "RESOLVED",
    dept: "Roads & Infrastructure",
    desc: "Pothole filled and sealed on Central Avenue",
    time: "12m ago",
    badgeColor:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    id: "REF-91823",
    type: "IN PROGRESS",
    dept: "Drainage & Water",
    desc: "High-pressure pump clearing stormwater drain",
    time: "25m ago",
    badgeColor:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    id: "REF-73194",
    type: "RESOLVED",
    dept: "Waste & Sanitation",
    desc: "Bulk debris cleared at West Market Plaza",
    time: "48m ago",
    badgeColor:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    id: "REF-62049",
    type: "ASSIGNED",
    dept: "Restoration & Safety",
    desc: "Hazardous tree branch inspection team dispatched",
    time: "1h ago",
    badgeColor:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

export function LiveMunicipalPulse() {
  return (
    <section className="py-8 bg-background border-b overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-xs shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
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
              <FadeIn
                key={evt.id}
                delay={idx * 0.08}
                duration={0.3}
                className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/40 transition-colors space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-foreground">
                    {evt.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${evt.badgeColor}`}
                  >
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
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

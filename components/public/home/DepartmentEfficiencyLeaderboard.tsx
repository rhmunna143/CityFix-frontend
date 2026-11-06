"use client";

import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/public/MotionWrappers";

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

export function DepartmentEfficiencyLeaderboard() {
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
            Live compliance metrics continuously updated through our automated
            SLA watchdog.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {depts.map((d) => (
            <StaggerItem key={d.name}>
              <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-xs space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground">
                    {d.name}
                  </h3>
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
                    <span className="text-[10px] text-muted-foreground block">
                      Target SLA
                    </span>
                    <span className="font-bold font-mono text-foreground">
                      {d.targetSla}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">
                      Avg. Speed
                    </span>
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {d.avgSpeed}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">
                      Citizen Score
                    </span>
                    <span className="font-bold text-amber-500">
                      {d.rating} ★
                    </span>
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

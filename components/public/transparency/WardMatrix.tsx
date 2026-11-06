"use client";

import { useState } from "react";

// Mock ward performance data for the interactive transparency matrix
const wardPerformanceData = [
  { ward: "Ward 1 (North District)", resolved: 142, active: 4, compliance: "99.1%", avgSpeed: "18.4h", grade: "A+" },
  { ward: "Ward 2 (West Market)", resolved: 218, active: 7, compliance: "98.5%", avgSpeed: "22.1h", grade: "A" },
  { ward: "Ward 3 (Riverfront)", resolved: 165, active: 5, compliance: "98.9%", avgSpeed: "19.8h", grade: "A" },
  { ward: "Ward 4 (Central Business)", resolved: 310, active: 9, compliance: "99.4%", avgSpeed: "15.2h", grade: "A+" },
  { ward: "Ward 5 (South Industrial)", resolved: 189, active: 11, compliance: "97.2%", avgSpeed: "26.5h", grade: "B+" },
  { ward: "Ward 6 (East Residential)", resolved: 174, active: 6, compliance: "98.8%", avgSpeed: "21.0h", grade: "A" },
];

export function WardMatrix() {
  const [selectedWardFilter, setSelectedWardFilter] = useState<string>("ALL");

  const displayedWards =
    selectedWardFilter === "ALL"
      ? wardPerformanceData
      : wardPerformanceData.filter((w) => w.ward.includes(selectedWardFilter));

  return (
    <div className="rounded-3xl border bg-card p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider block">
            Regional Accountability Index
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Ward-by-Ward SLA Compliance Matrix
          </h2>
        </div>

        {/* Ward Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {["ALL", "North", "West", "Central", "South", "East"].map((filt) => (
            <button
              key={filt}
              type="button"
              onClick={() => setSelectedWardFilter(filt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                selectedWardFilter === filt
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {filt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedWards.map((w, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-muted/30 border border-border/60 hover:border-primary/40 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-foreground">{w.ward}</h4>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 font-mono">
                Grade {w.grade}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-center pt-1 border-t border-border/40">
              <div className="p-2 rounded-xl bg-background/80 border">
                <span className="text-muted-foreground text-[10px] block">
                  Resolved
                </span>
                <span className="font-mono font-bold text-foreground text-xs">
                  {w.resolved}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-background/80 border">
                <span className="text-muted-foreground text-[10px] block">
                  On-Time
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                  {w.compliance}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-background/80 border">
                <span className="text-muted-foreground text-[10px] block">
                  Avg Speed
                </span>
                <span className="font-mono font-bold text-foreground text-xs">
                  {w.avgSpeed}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

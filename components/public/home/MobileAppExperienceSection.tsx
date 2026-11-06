"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/public/MotionWrappers";
import { CivicRadarVisual } from "@/components/public/CivicLottieVisual";

const features = [
  {
    title: "1-Tap GPS Geotagging",
    desc: "Pinpoint issue coordinates instantly on the interactive map without typing complex addresses.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Direct Photographic Evidence",
    desc: "Take camera photos directly from your phone. Technicians must provide matching resolution photos.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: "Real-Time Notifications",
    desc: "Instant status updates when staff is assigned, work is in progress, or completion notes are published.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "Automated Escalation Watchdog",
    desc: "If any department breaches its target turnaround window, the issue automatically escalates to supervisors.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export function MobileAppExperienceSection() {
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
                  CityFix is optimized for swift mobile access. No confusing
                  paper trails or bureaucratic waiting queues. Just report,
                  track, and verify.
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
                    <h3 className="font-bold text-sm text-foreground">
                      {f.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
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
                    <span className="font-bold text-sm text-foreground">
                      CityFix Dispatch
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                    Live Watchdog Active
                  </span>
                </div>

                {/* Live Radar Animation View */}
                <div className="relative p-3 rounded-2xl bg-slate-950/80 border border-border/80 flex flex-col items-center gap-3 overflow-hidden shadow-inner">
                  <div className="w-full flex items-center justify-between text-[11px] text-muted-foreground px-1">
                    <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      GPS RADAR 23.9015° N
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      SECTOR 02
                    </span>
                  </div>

                  <CivicRadarVisual className="w-52 h-52 sm:w-60 sm:h-60" />

                  <div className="w-full text-center">
                    <p className="text-[11px] text-zinc-300 font-medium">
                      Kushtia City Central District • Live Telemetry Feed
                    </p>
                  </div>
                </div>

                {/* Animated simulated notification toast */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 flex items-center gap-3"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      Technician Dispatched
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ETA: 18 mins • Guaranteed SLA 48h
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

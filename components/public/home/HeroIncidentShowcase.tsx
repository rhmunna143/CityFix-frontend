"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/public/MotionWrappers";

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
    image:
      "https://i.ibb.co.com/cSJms4vj/pixel-shot-k6j-CLw-THc9-I-unsplash.jpg",
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
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
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
    image:
      "https://i.ibb.co.com/27R3jTxb/109-cover-image-1920x1080.jpg",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
    scale: 0.97,
    filter: "blur(2px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 28 },
      opacity: { duration: 0.35, ease: "easeOut" as const },
      scale: { duration: 0.35, ease: "easeOut" as const },
      filter: { duration: 0.25 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -36 : 36,
    opacity: 0,
    scale: 0.97,
    filter: "blur(2px)",
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 28 },
      opacity: { duration: 0.25, ease: "easeIn" as const },
      scale: { duration: 0.25, ease: "easeIn" as const },
      filter: { duration: 0.2 },
    },
  }),
};

export function HeroIncidentShowcase() {
  const [activeIncidentIndex, setActiveIncidentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIncidentIndex((prev) => (prev + 1) % heroIncidents.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIncidentIndex((prev) =>
      prev === 0 ? heroIncidents.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIncidentIndex((prev) => (prev + 1) % heroIncidents.length);
  };

  const handleSelectCase = (idx: number) => {
    setDirection(idx >= activeIncidentIndex ? 1 : -1);
    setActiveIncidentIndex(idx);
  };

  const activeIncident = heroIncidents[activeIncidentIndex];

  return (
    <div className="lg:col-span-5 relative">
      <FadeIn delay={0.25} direction="left" duration={0.6}>
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative mx-auto max-w-md rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-6 shadow-2xl space-y-4 hover:border-primary/40 transition-colors"
        >
          {/* Auto-Slide Segmented Story Progress Bar */}
          <div className="grid grid-cols-3 gap-1.5 pb-1">
            {heroIncidents.map((_, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectCase(idx)}
                className="h-1 rounded-full bg-muted/80 overflow-hidden cursor-pointer relative"
                title={`Go to Case #${idx + 1}`}
              >
                {activeIncidentIndex === idx ? (
                  <motion.div
                    key={`progress-${idx}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: isPaused ? 0 : 4.5,
                      ease: "linear",
                    }}
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                  />
                ) : activeIncidentIndex > idx ? (
                  <div className="h-full w-full bg-primary/70 rounded-full" />
                ) : (
                  <div className="h-full w-0 bg-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Header Switcher */}
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live Incident Verification
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                {activeIncident.id}
              </span>
            </div>
          </div>

          {/* Smooth Animated Sliding Content */}
          <div className="relative overflow-hidden min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIncident.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3.5"
              >
                {/* Photo Thumbnail + Details */}
                <div className="space-y-3">
                  <div className="relative h-32 w-full rounded-xl overflow-hidden border border-border/60 group">
                    <Image
                      src={activeIncident.image}
                      alt={activeIncident.title}
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                      <span className="font-semibold drop-shadow-xs flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Field Photo Verified
                      </span>

                      <span className="bg-emerald-500/90 text-white font-mono px-2 py-0.5 rounded text-[10px] font-bold">
                        {activeIncident.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground text-lg tracking-tight line-clamp-1">
                    {activeIncident.title}
                  </h3>

                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                    <svg
                      className="h-3.5 w-3.5 text-primary shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>

                    <span>
                      {activeIncident.location} &bull;{" "}
                      {activeIncident.department}
                    </span>
                  </p>
                </div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-muted/40 rounded-xl p-2.5 border border-border/50">
                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">
                      Reported
                    </span>
                    <span className="font-semibold text-foreground text-xs">
                      {activeIncident.reported}
                    </span>
                  </div>

                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">
                      Assigned
                    </span>
                    <span className="font-semibold text-foreground text-xs">
                      {activeIncident.assigned}
                    </span>
                  </div>

                  <div>
                    <span className="block text-muted-foreground text-[10px] uppercase font-medium">
                      Completed
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                      {activeIncident.completed}
                    </span>
                  </div>
                </div>

                {/* SLA Metric Footer */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>

                    <span>
                      SLA Target: <strong>{activeIncident.slaTarget}</strong>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                    Resolved in {activeIncident.resolvedIn}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Incident Selector Tabs + Arrows */}
          <div className="pt-2 border-t flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous case"
                className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all cursor-pointer"
                title="Previous case"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next case"
                className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all cursor-pointer"
                title="Next case"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {heroIncidents.map((inc, idx) => (
                <button
                  key={inc.id}
                  type="button"
                  onClick={() => handleSelectCase(idx)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                    activeIncidentIndex === idx
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold scale-105"
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
  );
}

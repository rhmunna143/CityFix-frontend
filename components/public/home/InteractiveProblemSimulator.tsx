"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/public/MotionWrappers";
import { LazyOnView } from "@/components/shared/LazyOnView";

const simulationIssues = [
  {
    id: "SIM-ROAD",
    name: "Road Pothole & Asphalt Depression",
    category: "Roads & Infrastructure",
    standardSla: "48 Hours",
    prioritySla: "12 Hours",
    equipment: "Steamroller, Cold-mix Asphalt Paving Unit, Compactor",
    crewSize: "4 Field Technicians",
    hazardScore: "High (Vehicle Damage & Accident Risk)",
    image:
      "https://i.ibb.co.com/yBmHRWYv/eugene-chystiakov-y-OEBs-OJwk-I4-unsplash.jpg",
    description:
      "Severe asphalt crack or sinkhole damaging vehicles and hindering neighborhood pedestrian traffic.",
  },
  {
    id: "SIM-WATER",
    name: "Underground Water Pipe Leak",
    category: "Drainage & Water",
    standardSla: "24 Hours",
    prioritySla: "6 Hours",
    equipment: "Acoustic Leak Detector, Pipe Hydraulic Clamp, Backhoe",
    crewSize: "3 Utility Specialists",
    hazardScore: "Critical (Water Loss & Road Sub-base Erosion)",
    image:
      "https://i.ibb.co.com/pBNPKcyB/chloe-forbes-kindlen-o3-JVSTf-GF3k-unsplash.jpg",
    description:
      "Pressurized clean water main fracture resulting in localized flooding and water pressure drops.",
  },
  {
    id: "SIM-WASTE",
    name: "Illegal Commercial Dump Overspill",
    category: "Waste & Sanitation",
    standardSla: "24 Hours",
    prioritySla: "4 Hours",
    equipment: "Heavy Hydraulic Compactor Truck, Sanitizing Wash Unit",
    crewSize: "3 Sanitation Workers",
    hazardScore: "Severe (Bio-hazard & Pest Attraction)",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    description:
      "Uncontained industrial or marketplace garbage blocking pedestrian walkways and creating foul odor.",
  },
  {
    id: "SIM-LIGHT",
    name: "Streetlight Outage & Dark Corridor",
    category: "Restoration & Safety",
    standardSla: "36 Hours",
    prioritySla: "8 Hours",
    equipment: "Hydraulic Aerial Bucket Truck, LED Luminaire Unit",
    crewSize: "2 Certified Electricians",
    hazardScore: "Moderate (Public Safety & Night Crime Risk)",
    image:
      "https://i.ibb.co.com/0p4kmwz9/mario-spencer-Uyqxl-MS8-X84-unsplash.jpg",
    description:
      "Non-operational pole luminaire causing zero visibility along active community transit streets.",
  },
  {
    id: "SIM-TREE",
    name: "Hazardous Fallen Tree Branch",
    category: "Restoration & Safety",
    standardSla: "24 Hours",
    prioritySla: "4 Hours",
    equipment: "Hydraulic Wood Chipper, Heavy Chainsaw Kit, Boom Crane",
    crewSize: "4 Forestry Crew Members",
    hazardScore: "High (Overhead Powerline & Obstruction Risk)",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    description:
      "Storm-damaged overhead limbs threatening power cables or blocking two-lane motorways.",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
    scale: 0.98,
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
    scale: 0.98,
    filter: "blur(2px)",
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 28 },
      opacity: { duration: 0.25, ease: "easeIn" as const },
      scale: { duration: 0.25, ease: "easeIn" as const },
      filter: { duration: 0.2 },
    },
  }),
};

export function InteractiveProblemSimulator() {
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setSelectedIssueIndex((prev) => (prev + 1) % simulationIssues.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const container = tabsContainerRef.current;
    const tab = tabRefs.current[selectedIssueIndex];
    if (container && tab && container.scrollWidth > container.clientWidth) {
      const scrollLeft =
        tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [selectedIssueIndex]);

  const handleSelectIssue = (idx: number) => {
    setDirection(idx >= selectedIssueIndex ? 1 : -1);
    setSelectedIssueIndex(idx);
  };

  const current = simulationIssues[selectedIssueIndex];

  return (
    <LazyOnView minHeight={500} rootMargin="250px">
      <section className="py-16 md:py-24 bg-muted/15 border-y px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
              Interactive City Simulator
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Test Drive the Municipal Resolution Engine
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Select a common civic hazard to preview guaranteed turnaround SLAs,
              dispatched crew equipment, and automated escalations.
            </p>
          </FadeIn>

          <div className="flex items-center justify-center gap-2 mx-auto px-2">
            <div
              ref={tabsContainerRef}
              className="relative flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none"
            >
              {simulationIssues.map((issue, idx) => {
                const isSelected = selectedIssueIndex === idx;
                return (
                  <button
                    key={issue.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => handleSelectIssue(idx)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap overflow-hidden shrink-0 ${
                      isSelected
                        ? "text-primary-foreground font-bold shadow-md scale-[1.02]"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSimulatorTab"
                        className="absolute inset-0 bg-primary z-0 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {isSelected && (
                      <motion.div
                        key={`sim-tab-progress-${idx}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: isPaused ? 0 : 5,
                          ease: "linear",
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-300 z-10"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span>{issue.name.split("&")[0]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <FadeIn delay={0.1}>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="max-w-5xl mx-auto rounded-3xl border bg-card/90 backdrop-blur-md p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 text-[11px]">
                    Simulation Engine Active
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">
                    &bull;
                  </span>
                  <span className="text-muted-foreground text-[11px] hidden sm:inline">
                    Scenario {selectedIssueIndex + 1} of{" "}
                    {simulationIssues.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-semibold">
                    {current.id}
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden min-h-[380px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-5 space-y-3">
                      <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-border/80 group">
                        <Image
                          src={current.image}
                          alt={current.name}
                          fill
                          sizes="(min-width: 1024px) 380px, 90vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-mono font-bold">
                            {current.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-bold text-base tracking-tight">
                            {current.name}
                          </h4>
                          <p className="text-[11px] text-white/80 line-clamp-1">
                            {current.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-muted/50 border flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-foreground block">
                            Fast-Track Priority Mode
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Bump to front of technician dispatch queue
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPriority(!isPriority)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                            isPriority ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              isPriority ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                            Target Turnaround SLA
                          </span>
                          <span
                            className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                              isPriority
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-primary"
                            }`}
                          >
                            {isPriority
                              ? current.prioritySla
                              : current.standardSla}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                            Dispatch Priority
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-block mt-1 ${
                              isPriority
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                            }`}
                          >
                            {isPriority
                              ? "⚡ EXPEDITED QUEUE"
                              : "STANDARD DISPATCH"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-muted/40 border space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                            Dispatched Fleet Equipment
                          </span>
                          <span className="font-semibold text-foreground text-xs leading-relaxed block">
                            {current.equipment}
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-muted/40 border space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                            Field Crew Allocation
                          </span>
                          <span className="font-semibold text-foreground text-xs leading-relaxed block">
                            {current.crewSize}
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-muted/40 border space-y-1 col-span-1 sm:col-span-2">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                            Civic Hazard Impact Rating
                          </span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400 text-xs leading-relaxed block">
                            {current.hazardScore}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <Link
                          href={`/login?next=/dashboard/complaints/new`}
                          className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto h-11 px-6 font-semibold shadow-md shadow-primary/20 gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all`}
                        >
                          <span>
                            File Ticket for {current.name.split(" ")[0]}
                          </span>
                          <span>&rarr;</span>
                        </Link>
                        <Link
                          href="/services"
                          className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto h-11 px-5 cursor-pointer hover:bg-muted`}
                        >
                          View All SLA Targets
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </LazyOnView>
  );
}

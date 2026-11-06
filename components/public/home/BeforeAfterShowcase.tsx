"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/public/MotionWrappers";
import { LazyOnView } from "@/components/shared/LazyOnView";

const cases = [
  {
    title: "Dangerous Crater Pothole & Road Hazard",
    location: "Kushtia City Central Road &bull; Ward 4",
    department: "Roads & Infrastructure",
    resolvedTime: "28.5 Hours",
    rating: "5.0 ★★★★★",
    before: {
      condition:
        "Severe 18-inch asphalt depression causing vehicle rim damage and pedestrian hazard.",
      status: "High Priority Defect",
      label: "Before CityFix Intervention",
      image:
        "https://i.ibb.co.com/HjxQPKZ/regi-munandar-LA5-O8v4b-Jhw-unsplash.jpg",
      stamp: "CIVIC HAZARD LOGGED",
    },
    after: {
      condition:
        "Cold-mix asphalt leveling, compacted steam-roller seal, and reflective road markings restored.",
      status: "Photographically Verified",
      label: "After Municipal Completion",
      image:
        "https://i.ibb.co.com/v42C98Rj/Gemini-Generated-Image-kjy7hkkjy7hkkjy7.jpg",
      stamp: "INSPECTED & SEALED",
    },
  },
  {
    title: "Illegal Bulk Trash Accumulation",
    location: "West Market Pedestrian Zone B",
    department: "Waste & Sanitation",
    resolvedTime: "4.2 Hours",
    rating: "4.9 ★★★★★",
    before: {
      condition:
        "Overfilled commercial dumpster with hazardous organic waste and broken glass spill.",
      status: "Sanitary Hazard",
      label: "Before CityFix Intervention",
      image:
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
      stamp: "HEALTH BREACH LOGGED",
    },
    after: {
      condition:
        "Hydraulic compactor dispatch, sidewalk sanitization wash, and secondary collection bin installed.",
      status: "Sanitized & Verified",
      label: "After Municipal Completion",
      image:
        "https://i.ibb.co.com/4gjFzzFn/Gemini-Generated-Image-d0xvkjd0xvkjd0xv.jpg",
      stamp: "SANITIZED & DISINFECTED",
    },
  },
  {
    title: "Stormwater Drain Clog & Waterlogging",
    location: "Riverfront Park Blvd & Sump Gate",
    department: "Drainage & Water",
    resolvedTime: "3.8 Hours",
    rating: "5.0 ★★★★★",
    before: {
      condition:
        "Submerged roadside gutter causing 6-inch street water accumulation and traffic standstill.",
      status: "Flood Risk Alert",
      label: "Before CityFix Intervention",
      image:
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
      stamp: "FLOOD ALERT ACTIVE",
    },
    after: {
      condition:
        "Vacuum sucker truck cleared silt buildup; reinforced anti-clog steel grating installed.",
      status: "Drainage Flow Restored",
      label: "After Municipal Completion",
      image:
        "https://i.ibb.co.com/xcMRKmW/Gemini-Generated-Image-59u19k59u19k59u1.jpg",
      stamp: "FLOW RESTORED 100%",
    },
  },
  {
    title: "Storm-Damaged Overhead Tree Limb & Power Line",
    location: "Green Avenue & Sector 7 Power Corridor",
    department: "Restoration & Safety",
    resolvedTime: "2.5 Hours",
    rating: "5.0 ★★★★★",
    before: {
      condition:
        "Severe branch fracture suspended over active electrical cables and two-lane thoroughfare.",
      status: "Immediate Hazard",
      label: "Before CityFix Intervention",
      image:
        "https://i.ibb.co.com/n8NZj5gZ/Gemini-Generated-Image-avf251avf251avf2.jpg",
      stamp: "ELECTRICAL HAZARD LOGGED",
    },
    after: {
      condition:
        "Boom crane & certified arborists safely removed hanging limb; power lines cleared and road reopened.",
      status: "Hazard Neutralized",
      label: "After Municipal Completion",
      image:
        "https://i.ibb.co.com/b5Nrdcnr/Gemini-Generated-Image-41rkz941rkz941rk.jpg",
      stamp: "POWER CORRIDOR SECURED",
    },
  },
];

const nestedSlideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 32 : -32,
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
    x: dir > 0 ? -32 : 32,
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

export function BeforeAfterShowcase() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [nestedDirection, setNestedDirection] = useState(1);

  const caseTabsContainerRef = useRef<HTMLDivElement>(null);
  const caseTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSlides = cases.length * 2;
  const selectedCase = Math.floor(slideIndex / 2);
  const activeTab: "before" | "after" =
    slideIndex % 2 === 0 ? "before" : "after";

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setNestedDirection(1);
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    const container = caseTabsContainerRef.current;
    const tab = caseTabRefs.current[selectedCase];
    if (container && tab && container.scrollWidth > container.clientWidth) {
      const scrollLeft =
        tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [selectedCase]);

  const handleSelectCase = (idx: number) => {
    setNestedDirection(1);
    setSlideIndex(idx * 2);
  };

  const handleSelectTab = (tab: "before" | "after") => {
    if (tab === activeTab) return;
    setNestedDirection(tab === "after" ? 1 : -1);
    setSlideIndex(selectedCase * 2 + (tab === "after" ? 1 : 0));
  };

  const current = cases[selectedCase];
  const currentContent =
    activeTab === "before" ? current.before : current.after;

  return (
    <LazyOnView minHeight={500} rootMargin="250px">
      <section className="py-16 md:py-24 bg-muted/20 border-y px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <FadeIn className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
              Measurable Civic Impact
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Before & After Field Resolutions
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Every ticket requires photographic proof and supervisor inspection
              before being marked resolved. Watch real municipal cases cycle
              automatically.
            </p>
          </FadeIn>

          <div className="flex items-center justify-center gap-2 mx-auto px-2">
            <div
              ref={caseTabsContainerRef}
              className="relative flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none max-w-full"
            >
              {cases.map((c, idx) => {
                const isSelected = selectedCase === idx;
                return (
                  <button
                    key={idx}
                    ref={(el) => {
                      caseTabRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => handleSelectCase(idx)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap overflow-hidden shrink-0 ${
                      isSelected
                        ? "text-primary-foreground font-bold shadow-md scale-[1.02]"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCivicCasePill"
                        className="absolute inset-0 bg-primary z-0 rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span>
                        Case #{idx + 1}: {c.department.split("&")[0]}
                      </span>
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
              className="max-w-4xl mx-auto rounded-3xl border bg-card/90 backdrop-blur-md p-6 sm:p-10 shadow-lg space-y-6 relative group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
                      {current.department}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {current.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {current.location.replace("&bull;", "•")}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-muted/80 p-1 rounded-xl self-start sm:self-auto border border-border/50 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectTab("before")}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 overflow-hidden ${
                      activeTab === "before"
                        ? "text-destructive-foreground font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    {activeTab === "before" && (
                      <motion.div
                        layoutId="activeCivicNestedTab"
                        className="absolute inset-0 bg-destructive z-0 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {activeTab === "before" && (
                      <motion.div
                        key={`civic-tab-progress-before-${slideIndex}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: isPaused ? 0 : 4.5,
                          ease: "linear",
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-white/80 z-10"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          activeTab === "before"
                            ? "bg-white animate-pulse"
                            : "bg-destructive"
                        }`}
                      />
                      Before Defect
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectTab("after")}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 overflow-hidden ${
                      activeTab === "after"
                        ? "text-white font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    {activeTab === "after" && (
                      <motion.div
                        layoutId="activeCivicNestedTab"
                        className="absolute inset-0 bg-emerald-600 z-0 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {activeTab === "after" && (
                      <motion.div
                        key={`civic-tab-progress-after-${slideIndex}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: isPaused ? 0 : 4.5,
                          ease: "linear",
                        }}
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-200 z-10"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          activeTab === "after"
                            ? "bg-emerald-200"
                            : "bg-emerald-600"
                        }`}
                      />
                      After Resolution
                    </span>
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait" custom={nestedDirection}>
                <motion.div
                  key={`nested-${selectedCase}-${activeTab}`}
                  custom={nestedDirection}
                  variants={nestedSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    activeTab === "before"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-emerald-500/40 bg-emerald-500/5"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-full min-h-[250px] w-full overflow-hidden group/img">
                      <Image
                        src={currentContent.image}
                        alt={currentContent.label}
                        fill
                        sizes="(min-width: 768px) 450px, 90vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider shadow-sm ${
                            activeTab === "before"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          {currentContent.stamp}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 z-10 text-[11px] text-white/90 font-mono flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            activeTab === "before"
                              ? "bg-destructive animate-pulse"
                              : "bg-emerald-400"
                          }`}
                        />
                        {activeTab === "before"
                          ? "Initial Citizen GPS Evidence"
                          : "Supervised Field Close-out Photo"}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-5 flex flex-col justify-between">
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-bold flex items-center gap-1.5 ${
                              activeTab === "before"
                                ? "text-destructive"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                activeTab === "before"
                                  ? "bg-destructive"
                                  : "bg-emerald-500"
                              }`}
                            />
                            {currentContent.label}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              activeTab === "before"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {currentContent.status}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                          &ldquo;{currentContent.condition}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground">
                        {activeTab === "before"
                          ? "Reported via citizen app with verified GPS coordinates."
                          : "Verified by municipal engineering team & archived in public audit log."}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Turnaround Speed
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {current.resolvedTime}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Responsible Team
                  </span>
                  <span className="font-semibold text-foreground text-xs line-clamp-1">
                    {current.department}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Citizen Rating
                  </span>
                  <span className="font-semibold text-amber-500 text-xs">
                    {current.rating}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </LazyOnView>
  );
}

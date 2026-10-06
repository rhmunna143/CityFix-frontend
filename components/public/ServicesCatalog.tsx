"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Department, Category } from "@/types/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CivicSlaClockPulse } from "@/components/public/CivicLottieVisual";
import { FadeIn, HoverLiftCard } from "@/components/public/MotionWrappers";

interface ServicesCatalogProps {
  departments: Department[];
  categories: Category[];
}

// Department fleet and operations showcase with curated Unsplash imagery
const departmentFleets = [
  {
    name: "Roads & Infrastructure",
    subtitle: "Pavement Paving & Structural Integrity",
    image:
      "https://i.ibb.co.com/yBmHRWYv/eugene-chystiakov-y-OEBs-OJwk-I4-unsplash.jpg",
    fleet:
      "Cold-mix asphalt patch trucks, steamrollers, digital asphalt density scanners",
    crews: "6 Active Response Squads",
    avgSpeed: "28.5 Hours",
    targetSla: "48h Standard",
  },
  {
    name: "Waste & Sanitation",
    subtitle: "Urban Cleanliness & Bulk Debris Removal",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    fleet:
      "Hydraulic compactor trucks, high-pressure street washers, sanitizing sprayers",
    crews: "8 Active Collection Squads",
    avgSpeed: "4.2 Hours",
    targetSla: "24h Standard",
  },
  {
    name: "Drainage & Water",
    subtitle: "Stormwater Drainage & Water Main Security",
    image:
      "https://i.ibb.co.com/FkWg6BkV/joseph-sullan-e-Wj-O2wr-GW5k-unsplash.jpg",
    fleet:
      "Vacuum suction tankers, acoustic leak detectors, submersible sludge pumps",
    crews: "4 Hydraulic Crew Units",
    avgSpeed: "3.8 Hours",
    targetSla: "24h Standard",
  },
  {
    name: "Restoration & Safety",
    subtitle: "Hazard Mitigation & Streetlight Power",
    image:
      "https://i.ibb.co.com/cSJms4vj/pixel-shot-k6j-CLw-THc9-I-unsplash.jpg",
    fleet:
      "Aerial bucket trucks, high-torque hydraulic chainsaws, wood chippers",
    crews: "5 Emergency Units",
    avgSpeed: "14.5 Hours",
    targetSla: "36h Standard",
  },
];

export function ServicesCatalog({
  departments,
  categories,
}: ServicesCatalogProps) {
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [calcDept, setCalcDept] = useState<string>("Roads");
  const [calcPriority, setCalcPriority] = useState<boolean>(false);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      // Department filter
      if (selectedDept !== "ALL" && cat.departmentId !== selectedDept) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const deptName =
          departments.find((d) => d.id === cat.departmentId)?.name ||
          cat.department?.name ||
          "";
        const nameMatch = cat.name.toLowerCase().includes(q);
        const descMatch = cat.description?.toLowerCase().includes(q);
        const deptMatch = deptName.toLowerCase().includes(q);
        return nameMatch || descMatch || deptMatch;
      }
      return true;
    });
  }, [categories, departments, selectedDept, searchQuery]);

  return (
    <div className="space-y-14">
      {/* 1. Department Fleet & Operations Showcase */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest block">
              Municipal Readiness
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Department Operations & Equipment Fleet
            </h2>
          </div>
          <p className="text-xs text-muted-foreground sm:text-right max-w-xs">
            Equipped with modern machinery and GPS-tracked technician teams
            ready for rapid dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentFleets.map((dept, idx) => (
            <HoverLiftCard key={idx} className="h-full">
              <div className="rounded-2xl border bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-44 w-full">
                    <Image
                      src={dept.image}
                      alt={dept.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                        {dept.targetSla}
                      </span>
                      <h3 className="font-bold text-sm tracking-tight">
                        {dept.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {dept.fleet}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-border/50">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                          Avg Turnaround
                        </span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {dept.avgSpeed}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                          Field Crews
                        </span>
                        <span className="font-bold text-foreground">
                          {dept.crews}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      const matched = departments.find((d) =>
                        d.name
                          .toLowerCase()
                          .includes(dept.name.split(" ")[0].toLowerCase()),
                      );
                      if (matched) setSelectedDept(matched.id);
                    }}
                    className="w-full text-xs font-semibold py-2 rounded-xl bg-muted/60 hover:bg-primary hover:text-primary-foreground text-foreground transition-colors cursor-pointer text-center block"
                  >
                    Filter Categories &rarr;
                  </button>
                </div>
              </div>
            </HoverLiftCard>
          ))}
        </div>
      </div>

      {/* 2. Interactive SLA & Turnaround Estimator Widget */}
      <FadeIn delay={0.1}>
        <div className="rounded-3xl border bg-gradient-to-br from-card via-card/90 to-primary/5 p-6 md:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-4">
              <CivicSlaClockPulse className="w-12 h-12 shrink-0" />
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                  Live SLA Estimator
                </span>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Instant Turnaround & Priority Calculator
                </h3>
              </div>
            </div>

            {/* Priority Toggle */}
            <div className="flex items-center gap-3 bg-muted/60 p-2 rounded-2xl self-start sm:self-auto border">
              <span className="text-xs font-semibold text-muted-foreground">
                Standard
              </span>
              <button
                type="button"
                onClick={() => setCalcPriority(!calcPriority)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  calcPriority ? "bg-emerald-600" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    calcPriority ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-xs font-semibold ${calcPriority ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}`}
              >
                Fast-Track Priority
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-muted/30 border space-y-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Select Department Type
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {["Roads", "Waste", "Drainage", "Safety"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setCalcDept(d)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      calcDept === d
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Target Resolution SLA Window
              </span>
              <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                {calcDept === "Waste"
                  ? calcPriority
                    ? "4 Hours"
                    : "24 Hours"
                  : calcDept === "Drainage"
                    ? calcPriority
                      ? "6 Hours"
                      : "24 Hours"
                    : calcDept === "Roads"
                      ? calcPriority
                        ? "12 Hours"
                        : "48 Hours"
                      : calcPriority
                        ? "8 Hours"
                        : "36 Hours"}
              </span>
              <p className="text-[11px] text-muted-foreground">
                {calcPriority
                  ? "⚡ Expedited crew assigned with high-priority dispatch"
                  : "Standard verified queue with supervisor escalation on breach"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Supervisor Escalation Threshold
              </span>
              <span className="text-xl font-bold text-foreground block">
                {calcPriority ? "+2h Post Deadline" : "+4h Post Deadline"}
              </span>
              <p className="text-[11px] text-muted-foreground">
                Automatic departmental notification sent directly to city
                ombudsman if SLA breached.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 3. Search and Quick Department Filters */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border bg-card/70 backdrop-blur-md shadow-xs"
        >
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              type="search"
              placeholder="Search categories (e.g. Pothole, Road, Sanitation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl"
            />
          </div>

          {/* Department Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedDept("ALL")}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedDept === "ALL"
                  ? "text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {selectedDept === "ALL" && (
                <motion.span
                  layoutId="activeDeptPill"
                  className="absolute inset-0 bg-primary rounded-xl shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              All Departments ({categories.length})
            </button>

            {departments.map((dept) => {
              const count = categories.filter(
                (c) => c.departmentId === dept.id,
              ).length;
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDept(dept.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeDeptPill"
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {dept.name} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 border rounded-2xl bg-card space-y-3"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-foreground">
              No matching categories found
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search query or department filter to see
              available civic services.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDept("ALL");
                setSearchQuery("");
              }}
              className="text-xs text-primary font-medium hover:underline cursor-pointer pt-2"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCategories.map((cat, index) => {
                const isPaid = !!cat.basePrice && parseFloat(cat.basePrice) > 0;
                const deptName =
                  departments.find((d) => d.id === cat.departmentId)?.name ||
                  cat.department?.name ||
                  "Municipal";
                return (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.05, 0.3),
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Card className="flex flex-col justify-between h-full hover:shadow-lg hover:border-primary/40 transition-all border bg-card/90">
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge
                            variant="outline"
                            className="text-[11px] font-medium bg-muted/40"
                          >
                            {deptName}
                          </Badge>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {cat.slaHours
                              ? `${cat.slaHours}h SLA`
                              : "Standard SLA"}
                          </span>
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                          {cat.name}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                          {cat.description ||
                            "General municipal maintenance and service request category."}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-2">
                        <div className="flex items-center justify-between text-xs py-2.5 px-3 rounded-xl bg-muted/40 border border-border/50">
                          <span className="text-muted-foreground font-medium">
                            Service Fee
                          </span>
                          <span className="font-bold text-foreground">
                            {isPaid ? `$${cat.basePrice}` : "Free / Standard"}
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-2 border-t">
                        <Link
                          href={`/login?next=/dashboard/complaints/new`}
                          className={`${buttonVariants({ variant: "default", size: "sm" })} w-full justify-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-transform`}
                        >
                          <span>Report This Problem</span>
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* 4. Municipal Citizen Guarantee Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
        <div className="p-4 rounded-2xl bg-card border space-y-1.5">
          <span className="text-base">📸</span>
          <h4 className="font-bold text-sm text-foreground">
            Photo Verification
          </h4>
          <p className="text-xs text-muted-foreground">
            Closeout photos required before any ticket can be marked resolved.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-card border space-y-1.5">
          <span className="text-base">⏱️</span>
          <h4 className="font-bold text-sm text-foreground">
            Guaranteed SLA Clocks
          </h4>
          <p className="text-xs text-muted-foreground">
            Countdown timers run transparently for public inspection.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-card border space-y-1.5">
          <span className="text-base">🚨</span>
          <h4 className="font-bold text-sm text-foreground">
            Automated Escalation
          </h4>
          <p className="text-xs text-muted-foreground">
            Overdue issues escalate directly to senior municipal directors.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-card border space-y-1.5">
          <span className="text-base">🔄</span>
          <h4 className="font-bold text-sm text-foreground">Right to Reopen</h4>
          <p className="text-xs text-muted-foreground">
            Unsatisfied with field quality? Reopen tickets anytime with 1 click.
          </p>
        </div>
      </div>
    </div>
  );
}

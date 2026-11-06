"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Activity,
  Car,
  Droplets,
  Lightbulb,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLiftCard,
} from "@/components/public/MotionWrappers";
import { LazyOnView } from "@/components/shared/LazyOnView";

const chapters = [
  {
    id: "ch-1",
    title: "Smart Transit & Arterial Flow",
    category: "Roads & Traffic",
    sector: "Sector 01 — Central Ring Corridor",
    stat: "96.4%",
    statLabel: "Live Flow Efficiency",
    speed: "1x",
    icon: Car,
    gradient: "from-blue-500 to-cyan-500",
    description:
      "High-definition optical tracking and AI traffic-flow synchronization maintaining smooth metropolitan transit across vital corridors.",
  },
  {
    id: "ch-2",
    title: "Rapid Pothole & Surface Patching",
    category: "Infrastructure",
    sector: "Sector 03 — Downtown Commercial Hub",
    stat: "3.8h",
    statLabel: "Avg Resolution Time",
    speed: "1.25x",
    icon: Activity,
    gradient: "from-amber-500 to-orange-500",
    description:
      "Thermal asphalt crews dispatched within minutes of citizen reporting, backed by automated SLA countdowns and digital compaction logs.",
  },
  {
    id: "ch-3",
    title: "Stormwater Drainage & Flood Defense",
    category: "Water & Canals",
    sector: "Sector 05 — Riverside Canal Network",
    stat: "0 Floods",
    statLabel: "Retention Stability",
    speed: "1x",
    icon: Droplets,
    gradient: "from-emerald-500 to-teal-500",
    description:
      "Automated pumping stations and sonar telemetry depth sensors ensuring clear waterways and preventing monsoon flash flooding.",
  },
  {
    id: "ch-4",
    title: "Smart LED Grid & Eco Illumination",
    category: "Lighting & Power",
    sector: "Sector 08 — Eastern Boulevard District",
    stat: "99.8%",
    statLabel: "Grid Uptime Index",
    speed: "1.5x",
    icon: Lightbulb,
    gradient: "from-purple-500 to-indigo-500",
    description:
      "Solar-backed municipal lighting with automated twilight sensors and rapid bulb replacement dispatch for complete pedestrian safety.",
  },
];

export function CinematicMunicipalShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const currentChapter = chapters[activeChapter];
  const CurrentIcon = currentChapter.icon;

  // Autoplay and pause when outside of viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && video && !video.paused) {
          video.pause();
          setIsPlaying(false);
        } else if (entry.isIntersecting && video && video.paused) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleSelectChapter = (idx: number) => {
    setActiveChapter(idx);
    if (videoRef.current && videoRef.current.duration) {
      const offsets = [0, 0.25, 0.5, 0.75];
      videoRef.current.currentTime = offsets[idx] * videoRef.current.duration;
      if (!isPlaying) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  return (
    <LazyOnView minHeight={500} rootMargin="200px">
      <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-muted/30 to-background overflow-hidden border-b">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-primary/10 dark:bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/4 left-10 w-[350px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-4">
            <FadeIn direction="down" duration={0.4}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>24/7 Autoplay Civic Stream • Live Municipal Watchdog</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} duration={0.5}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
                Witness Modern Civic Infrastructure In{" "}
                <span className="bg-linear-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  Real-Time Motion.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.5}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                From metropolitan transit corridors to rapid pothole patching and
                flood defense, see how CityFix orchestrates field engineering
                crews and guarantees transparent SLA response times across all
                urban sectors.
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center max-h-[90vh]">
            <FadeIn delay={0.25} duration={0.6}>
              <div className="relative mx-auto">
                <div className="absolute -inset-2 sm:-inset-4 bg-linear-to-r from-blue-600/30 via-primary/30 to-emerald-500/30 rounded-[2.5rem] blur-2xl opacity-60 dark:opacity-85 transition-all duration-700 pointer-events-none -z-10" />

                <div
                  ref={containerRef}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-black aspect-video select-none"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
                    onClick={togglePlay}
                    className="w-full h-full object-cover cursor-pointer"
                  >
                    <source
                      src="/videos/cityfix-autoplay-video.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/60 pointer-events-none"
                  />

                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer transition-all"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="h-20 w-20 rounded-full bg-primary/90 text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-white/30 backdrop-blur-md"
                      >
                        <Play className="h-9 w-9 fill-current ml-1" />
                      </motion.div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 space-y-3 pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${currentChapter.gradient} flex items-center justify-center shadow-lg shrink-0 text-white`}
                        >
                          <CurrentIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/15 text-white font-bold">
                              {currentChapter.category}
                            </span>
                            <span className="text-xs text-white/70 font-mono">
                              {currentChapter.sector}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1">
                            {currentChapter.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-2 md:pt-0">
                        <div className="text-left md:text-right">
                          <span className="text-base sm:text-lg font-mono font-black text-emerald-400 block leading-tight">
                            {currentChapter.stat}
                          </span>
                          <span className="text-[10px] text-white/60 font-medium block">
                            {currentChapter.statLabel}
                          </span>
                        </div>

                        <div className="h-8 w-px bg-white/15 hidden sm:block" />

                        <div className="text-left md:text-right">
                          <span className="text-base sm:text-lg font-mono font-black text-blue-400 block leading-tight">
                            28 Teams
                          </span>
                          <span className="text-[10px] text-white/60 font-medium block">
                            Active Field Dispatch
                          </span>
                        </div>

                        <div className="h-8 w-px bg-white/15 hidden sm:block" />

                        <div className="text-left md:text-right">
                          <span className="text-base sm:text-lg font-mono font-black text-purple-400 block leading-tight">
                            100%
                          </span>
                          <span className="text-[10px] text-white/60 font-medium block">
                            Verified Proof Log
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mx-auto">
                {chapters.map((ch, idx) => {
                  const IconComp = ch.icon;
                  const isSelected = activeChapter === idx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(idx)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? "bg-card border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]"
                          : "bg-card/60 hover:bg-card border-border/80 hover:border-primary/40 shadow-xs"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeChapterGlow"
                          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500"
                        />
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          <IconComp className="h-4 w-4" />
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <h4 className="font-bold text-foreground text-sm tracking-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {ch.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px]">
                        <span className="font-mono text-muted-foreground">
                          {ch.statLabel}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {ch.stat}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="stage-items mt-22">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
            <StaggerItem>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-xs space-y-3 shadow-xs h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Radio className="h-5 w-5" />
                    </div>

                    <h4 className="font-bold text-foreground text-base tracking-tight">
                      AI Automated Detection
                    </h4>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Integrated civic camera telemetry and high-resolution drone
                      scans detect road cracks, potholes, and illegal dumping
                      hotspots before they escalate.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Sub-Second Telemetry Flagging</span>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>

            <StaggerItem>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-xs space-y-3 shadow-xs h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-foreground text-base tracking-tight">
                      Geo-Stamped Video Proof
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Every field technician uploads timestamped photographic and
                      video confirmation before a complaint can be marked as
                      resolved on the civic audit log.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Tamper-Resistant GPS Verification</span>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>

            <StaggerItem>
              <HoverLiftCard className="h-full">
                <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-xs space-y-3 shadow-xs h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-foreground text-base tracking-tight">
                      Strict SLA Countdowns
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Public resolution clocks ensure complete municipal
                      accountability. Track repair teams from dispatch to final
                      inspection with zero bureaucratic delays.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Publicly Audited Milestones</span>
                  </div>
                </div>
              </HoverLiftCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </LazyOnView>
  );
}

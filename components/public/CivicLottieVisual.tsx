"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import DotLottieReact with SSR disabled to prevent hydration mismatch
const DotLottiePlayer = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center animate-pulse bg-muted/40 rounded-2xl" />
    ),
  }
);

interface LottieAnimationProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export function DotLottieEmbed({
  src,
  autoplay = true,
  loop = true,
  className = "w-full h-full",
}: LottieAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`animate-pulse bg-muted/30 rounded-2xl ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <DotLottiePlayer
        src={src}
        autoplay={autoplay}
        loop={loop}
        className="w-full h-full"
      />
    </div>
  );
}

/**
 * High-performance Framer-Motion Animated Civic Radar Screen
 * Visualizes live GPS sensing and municipal vehicle dispatch
 */
export function CivicRadarVisual({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-slate-950/80 dark:bg-black/90 border border-primary/40 shadow-2xl overflow-hidden ${className}`}>
      {/* Radar concentric range circles */}
      <div className="absolute inset-4 rounded-full border border-primary/20" />
      <div className="absolute inset-10 rounded-full border border-primary/25" />
      <div className="absolute inset-16 rounded-full border border-primary/30" />
      <div className="absolute inset-24 rounded-full border border-primary/40" />

      {/* Crosshair grid lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-primary/25" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-full w-px bg-primary/25" />
      </div>

      {/* Rotating radar sweep beam */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-0 origin-center pointer-events-none"
      >
        <div
          className="w-1/2 h-1/2 origin-bottom-right"
          style={{
            background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.45) 0deg, rgba(16, 185, 129, 0) 90deg)",
          }}
        />
      </motion.div>

      {/* Blinking City Pin Points */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/3 flex items-center gap-1"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        <span className="text-[9px] font-mono text-emerald-400 font-bold px-1 rounded bg-black/60 border border-emerald-500/30">
          CREW-01
        </span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-1/3 left-1/4 flex items-center gap-1"
      >
        <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
        <span className="text-[9px] font-mono text-amber-300 font-bold px-1 rounded bg-black/60 border border-amber-500/30">
          POTHOLE #42
        </span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 1.4 }}
        className="absolute top-1/3 left-1/3 flex items-center gap-1"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
        <span className="text-[9px] font-mono text-blue-300 font-bold px-1 rounded bg-black/60 border border-blue-500/30">
          DRAIN #09
        </span>
      </motion.div>

      {/* Center Beacon */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-primary animate-ping absolute" />
        <span className="h-3 w-3 rounded-full bg-primary border-2 border-white shadow-lg" />
      </div>
    </div>
  );
}

/**
 * Animated SLA Clock Pulse Vector
 */
export function CivicSlaClockPulse({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full text-primary"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="6 8"
          className="opacity-40"
        />
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-70"
        />
      </motion.svg>

      {/* Animated clock hands */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="h-7 w-0.5 bg-emerald-500 origin-bottom rounded-full -translate-y-3.5 shadow-xs"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="h-5 w-1 bg-primary origin-bottom rounded-full -translate-y-2.5"
        />
        <div className="h-2 w-2 rounded-full bg-foreground border border-background z-10" />
      </div>
    </div>
  );
}

/**
 * Animated Eco Leaf / Clean City Vector Graphic
 */
export function CivicEcoLeafAnimation({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className={`relative flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 ${className}`}
    >
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    </motion.div>
  );
}

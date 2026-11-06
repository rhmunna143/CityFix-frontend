"use client";

import {
  motion,
  HTMLMotionProps,
  AnimatePresence,
  useScroll,
  animate,
  useInView,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

// Top scroll progress indicator
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-600 origin-left z-50 pointer-events-none"
    />
  );
}

// FadeIn element on viewport scroll with optional eager SSR rendering for above-the-fold content
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  eager?: boolean;
}) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24, x: 0 };
      case "down":
        return { y: -24, x: 0 };
      case "left":
        return { x: 24, y: 0 };
      case "right":
        return { x: -24, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={eager ? false : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={eager ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger parent container
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item for StaggerContainer
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover lift card
export function HoverLiftCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth Animated Counter on viewport entry — 0 React re-renders during animation
export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.5,
  className = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

// Animated Floating Beacon / Badge
export function FloatingBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence, motion };

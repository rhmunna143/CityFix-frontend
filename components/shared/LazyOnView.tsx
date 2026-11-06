"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function LazyOnView({
  children,
  fallback,
  rootMargin = "300px",
  minHeight = 400,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : fallback}
    </div>
  );
}

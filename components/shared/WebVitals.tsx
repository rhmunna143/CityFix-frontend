"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only in development or when explicitly enabled
    if (process.env.NODE_ENV === "development") {
      const { name, value, rating } = metric;
      if (
        typeof window !== "undefined" &&
        Boolean((window as unknown as { __DEBUG_VITALS__?: boolean }).__DEBUG_VITALS__)
      ) {
        console.info(`[WebVital] ${name}: ${Math.round(value)} (${rating})`);
      }
    }
  });

  return null;
}

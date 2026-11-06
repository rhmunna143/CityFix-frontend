"use client";

import { useEffect, useState } from "react";

export function useIdle(timeout = 2000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        options?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setIdle(true), { timeout });
      return () => {
        if (typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(id);
        }
      };
    } else {
      const id = window.setTimeout(() => setIdle(true), timeout);
      return () => clearTimeout(id);
    }
  }, [timeout]);

  return idle;
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      let isPageUpdate = false;
      Object.entries(updates).forEach(([key, value]) => {
        if (key === "page") isPageUpdate = true;
        
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      if (!isPageUpdate && params.has("page")) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return {
    searchParams,
    updateUrl,
    get: (key: string, defaultValue: string = "") => searchParams.get(key) || defaultValue,
    getPage: () => parseInt(searchParams.get("page") || "1", 10),
  };
}

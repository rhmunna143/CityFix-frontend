"use client";

import { startTransition, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // reads the live URL → identity never changes on query param change → safe in effect deps
  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      }
      if (!("page" in updates) && params.has("page")) {
        params.set("page", "1");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router]
  );

  const get = useCallback(
    (key: string, fallback = "") => searchParams.get(key) || fallback,
    [searchParams]
  );

  const getPage = useCallback(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  return { searchParams, updateUrl, get, getPage };
}

"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Paginated } from "@/types/api";
import { useUrlState } from "./useUrlState";

export function useListQuery<T>(
  scope: readonly string[],
  fetcher: (params: URLSearchParams) => Promise<Paginated<T>>
) {
  const { searchParams } = useUrlState();
  const qs = searchParams.toString();

  return useQuery({
    queryKey: [...scope, qs],
    queryFn: () => fetcher(new URLSearchParams(qs)),
    placeholderData: keepPreviousData, // keep old rows while the next page loads to eliminate layout shift
  });
}

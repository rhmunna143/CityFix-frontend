"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchInput({
  placeholder = "Search complaints...",
}: {
  placeholder?: string;
}) {
  const { get, updateUrl } = useUrlState();
  const [value, setValue] = useState(() => get("q"));
  const debounced = useDebounce(value, 300);
  const committed = useRef(value);

  useEffect(() => {
    if (debounced === committed.current) return;
    committed.current = debounced;
    updateUrl({ q: debounced });
  }, [debounced, updateUrl]);

  return (
    <div className="relative max-w-sm w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

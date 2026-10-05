"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Department, Category } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface ServicesCatalogProps {
  departments: Department[];
  categories: Category[];
}

export function ServicesCatalog({ departments, categories }: ServicesCatalogProps) {
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      // Department filter
      if (selectedDept !== "ALL" && cat.departmentId !== selectedDept) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const deptName = departments.find((d) => d.id === cat.departmentId)?.name || cat.department?.name || "";
        const nameMatch = cat.name.toLowerCase().includes(q);
        const descMatch = cat.description?.toLowerCase().includes(q);
        const deptMatch = deptName.toLowerCase().includes(q);
        return nameMatch || descMatch || deptMatch;
      }
      return true;
    });
  }, [categories, departments, selectedDept, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl border bg-card/60 backdrop-blur-xs">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <Input
            type="search"
            placeholder="Search categories (e.g. Pothole, Road, Sanitation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Department Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedDept("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedDept === "ALL"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Departments ({categories.length})
          </button>
          {departments.map((dept) => {
            const count = categories.filter((c) => c.departmentId === dept.id).length;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDept === dept.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {dept.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 border rounded-2xl bg-card space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-foreground">No matching categories found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search query or department filter to see available civic services.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedDept("ALL"); setSearchQuery(""); }}
            className="text-xs text-primary font-medium hover:underline cursor-pointer pt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const isPaid = !!cat.basePrice && parseFloat(cat.basePrice) > 0;
            return (
              <Card key={cat.id} className="flex flex-col justify-between hover:shadow-md transition-shadow border">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[11px] font-normal">
                      {departments.find((d) => d.id === cat.departmentId)?.name || cat.department?.name || "Municipal"}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {cat.slaHours ? `${cat.slaHours}h SLA` : "Standard SLA"}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                    {cat.name}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {cat.description || "General municipal maintenance and service request category."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-muted/40">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-semibold text-foreground">
                      {isPaid ? `$${cat.basePrice}` : "Free / Standard"}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t">
                  <Link
                    href={`/login?next=/dashboard/complaints/new`}
                    className={`${buttonVariants({ variant: "default", size: "sm" })} w-full justify-center gap-1.5 cursor-pointer`}
                  >
                    <span>Report This Problem</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

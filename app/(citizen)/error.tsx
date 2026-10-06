"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function CitizenError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Citizen dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center space-y-4 rounded-2xl border border-destructive/20 bg-destructive/5">
      <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Unable to Load Citizen Dashboard</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {error.message || "An issue occurred while loading your complaints. Please try again."}
        </p>
      </div>
      <Button onClick={() => reset()} className="gap-2 cursor-pointer">
        <RotateCcw className="h-4 w-4" />
        <span>Reload Dashboard</span>
      </Button>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto my-16 p-8 rounded-2xl border border-destructive/20 bg-destructive/5 text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Content Temporarily Unavailable</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "We encountered an issue loading this public service page. Please refresh or try again shortly."}
        </p>
      </div>
      <Button onClick={() => reset()} className="gap-2 cursor-pointer">
        <RotateCcw className="h-4 w-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}

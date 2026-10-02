"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <EmptyState
        icon={AlertCircle}
        title="Something went wrong!"
        description={error.message || "An unexpected error occurred."}
        action={<Button onClick={() => reset()}>Try again</Button>}
      />
    </div>
  );
}

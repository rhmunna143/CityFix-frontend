"use client";

import { memo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reopenComplaint } from "@/lib/api/complaints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface ReopenCardProps {
  complaintId: string;
}

export const ReopenCard = memo(function ReopenCard({
  complaintId,
}: ReopenCardProps) {
  const queryClient = useQueryClient();

  const reopenMutation = useMutation({
    mutationFn: () => reopenComplaint(complaintId),
    onSuccess: () => {
      toast.success("Complaint reopened successfully");
      queryClient.invalidateQueries({ queryKey: ["complaint", complaintId] });
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to reopen complaint"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue not resolved?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          You can reopen this complaint if the issue persists. You can only do this once.
        </p>
        <Button
          variant="outline"
          className="w-full text-destructive hover:bg-destructive/10 cursor-pointer"
          onClick={() => reopenMutation.mutate()}
          disabled={reopenMutation.isPending}
        >
          {reopenMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Reopen Complaint
        </Button>
      </CardContent>
    </Card>
  );
});

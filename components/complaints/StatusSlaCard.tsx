"use client";

import { memo } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { PaymentActions } from "./PaymentActions";
import type { Complaint } from "@/types/api";

interface StatusSlaCardProps {
  complaint: Complaint;
}

export const StatusSlaCard = memo(function StatusSlaCard({
  complaint,
}: StatusSlaCardProps) {
  const isClosedOrResolved =
    complaint.status === "CLOSED" || complaint.status === "RESOLVED";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status & SLA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm text-muted-foreground block mb-1">
            Current Status
          </span>
          <div className="flex gap-2 items-center">
            <Badge
              variant={
                complaint.status === "RESOLVED" || complaint.status === "CLOSED"
                  ? "default"
                  : "secondary"
              }
            >
              {complaint.status}
            </Badge>
            {complaint.isPriority && (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Zap className="h-3 w-3 mr-1" /> Priority
              </Badge>
            )}
          </div>
        </div>
        <div>
          <span className="text-sm text-muted-foreground block mb-1">
            Category
          </span>
          <span className="font-medium">{complaint.category?.name}</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground block mb-1">
            Department
          </span>
          <span className="font-medium">
            {complaint.department?.name || "Unassigned"}
          </span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground block mb-1">
            SLA Deadline
          </span>
          <span
            className={`font-medium ${
              complaint.isSlaBreached ? "text-destructive" : ""
            }`}
          >
            {format(new Date(complaint.slaDeadline), "PPp")}
          </span>
        </div>
        {complaint.isPriority && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-2">
            <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Priority Confirmed</p>
              <p className="text-amber-700 dark:text-amber-400 mt-1">
                This complaint has been upgraded. The SLA deadline is
                accelerated.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      {!isClosedOrResolved && (
        <CardFooter className="flex flex-col p-6 pt-0">
          <PaymentActions complaint={complaint} />
        </CardFooter>
      )}
    </Card>
  );
});

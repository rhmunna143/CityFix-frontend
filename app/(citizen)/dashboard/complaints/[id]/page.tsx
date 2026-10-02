"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchComplaintById } from "@/lib/api/complaints";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function ComplaintDetail() {
  const { id } = useParams() as { id: string };
  const { data: complaint, isLoading, error } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchComplaintById(id),
  });

  if (isLoading) return <SkeletonDetail />;
  if (error) return <div className="text-destructive">Failed to load complaint.</div>;
  if (!complaint) return <div>Complaint not found.</div>;

  return (
    <div className="space-y-6">
      <PageHeader 
        title={complaint.title} 
        description={`Ref: ${complaint.referenceCode} - Reported on ${format(new Date(complaint.createdAt), "PP")}`}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{complaint.description}</p>
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-muted-foreground">{complaint.address}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resolution Note</CardTitle>
            </CardHeader>
            <CardContent>
              {complaint.resolutionNote ? (
                <p className="text-muted-foreground">{complaint.resolutionNote}</p>
              ) : (
                <div className="text-muted-foreground italic">No resolution note yet.</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & SLA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Current Status</span>
                <Badge variant={complaint.status === "RESOLVED" || complaint.status === "CLOSED" ? "default" : "secondary"}>{complaint.status}</Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Category</span>
                <span className="font-medium">{complaint.category?.name}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Department</span>
                <span className="font-medium">{complaint.department?.name || "Unassigned"}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground block mb-1">SLA Deadline</span>
                <span className={`font-medium ${complaint.isSlaBreached ? 'text-destructive' : ''}`}>
                  {format(new Date(complaint.slaDeadline), "PPp")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

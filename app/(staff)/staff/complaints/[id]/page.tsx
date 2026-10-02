"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComplaintById, updateComplaintStatus } from "@/lib/api/complaints";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function StaffComplaintDetail() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const [resolutionNote, setResolutionNote] = useState("");
  
  const { data: complaint, isLoading, error } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchComplaintById(id),
  });

  const updateMutation = useMutation({
    mutationFn: ({ status, note }: { status: string; note?: string }) => 
      updateComplaintStatus(id, status, note),
    onMutate: async ({ status, note }) => {
      await queryClient.cancelQueries({ queryKey: ["complaint", id] });
      const previousComplaint = queryClient.getQueryData(["complaint", id]);
      
      queryClient.setQueryData(["complaint", id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          status,
          resolutionNote: note || old.resolutionNote,
        };
      });
      
      return { previousComplaint };
    },
    onError: (err, newStatus, context) => {
      queryClient.setQueryData(["complaint", id], context?.previousComplaint);
      toast.error(err.message || "Failed to update status");
    },
    onSuccess: (data) => {
      toast.success(`Complaint marked as ${data.status}`);
      setResolutionNote(""); 
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["complaint", id] });
    },
  });

  if (isLoading) return <SkeletonDetail />;
  if (error) return <div className="text-destructive">Failed to load complaint.</div>;
  if (!complaint) return <div>Complaint not found.</div>;

  const isAssigned = complaint.status === "ASSIGNED";
  const isInProgress = complaint.status === "IN_PROGRESS";
  
  const handleStatusChange = (newStatus: string) => {
    if (newStatus === "RESOLVED" && !resolutionNote.trim()) {
      toast.error("Resolution note is required to resolve a complaint.");
      return;
    }
    updateMutation.mutate({ status: newStatus, note: newStatus === "RESOLVED" ? resolutionNote : undefined });
  };

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
              <CardTitle>Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAssigned && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Mark this complaint as In Progress to begin work.</p>
                  <Button 
                    onClick={() => handleStatusChange("IN_PROGRESS")} 
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending && updateMutation.variables?.status === "IN_PROGRESS" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Start Work (In Progress)
                  </Button>
                </div>
              )}
              
              {isInProgress && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Provide a resolution note to mark this complaint as Resolved.</p>
                  <Textarea 
                    placeholder="Describe how the issue was resolved..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    rows={4}
                  />
                  <Button 
                    onClick={() => handleStatusChange("RESOLVED")} 
                    disabled={updateMutation.isPending || !resolutionNote.trim()}
                  >
                    {updateMutation.isPending && updateMutation.variables?.status === "RESOLVED" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Resolve Complaint
                  </Button>
                </div>
              )}
              
              {!isAssigned && !isInProgress && (
                <div className="text-muted-foreground text-sm">
                  This complaint is currently {complaint.status}. No actions available.
                </div>
              )}
            </CardContent>
          </Card>
          
          {complaint.resolutionNote && (
             <Card>
               <CardHeader>
                 <CardTitle>Resolution Note</CardTitle>
               </CardHeader>
               <CardContent>
                 <p>{complaint.resolutionNote}</p>
               </CardContent>
             </Card>
          )}
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

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComplaintById, deleteComplaint } from "@/lib/api/complaints";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { StatusSlaCard } from "@/components/complaints/StatusSlaCard";
import { ReopenCard } from "@/components/complaints/ReopenCard";
import { FeedbackCard } from "@/components/complaints/FeedbackCard";

export default function ComplaintDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: complaint, isLoading, error } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchComplaintById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComplaint(id),
    onSuccess: () => {
      toast.success("Complaint cancelled and deleted");
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["citizen-stats"] });
      router.push("/dashboard");
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to delete complaint"),
  });

  if (isLoading) return <SkeletonDetail />;
  if (error)
    return <div className="text-destructive">Failed to load complaint.</div>;
  if (!complaint) return <div>Complaint not found.</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={complaint.title}
        description={`Ref: ${complaint.referenceCode} - Reported on ${format(
          new Date(complaint.createdAt),
          "PP"
        )}`}
        action={
          complaint.status === "SUBMITTED" ? (
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to cancel and delete this complaint?"
                  )
                ) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete Complaint
            </Button>
          ) : undefined
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="whitespace-pre-wrap">{complaint.description}</p>

              {complaint.attachments && complaint.attachments.length > 0 && (
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-sm mb-2">Attachments</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {complaint.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="relative aspect-square rounded-md overflow-hidden border bg-muted/20"
                      >
                        <Image
                          src={attachment.url}
                          alt="Complaint attachment"
                          fill
                          sizes="(min-width: 768px) 25vw, 50vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm mb-2">Location</h4>
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
                <p className="text-muted-foreground">
                  {complaint.resolutionNote}
                </p>
              ) : (
                <div className="text-muted-foreground italic">
                  No resolution note yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <StatusSlaCard complaint={complaint} />

          {complaint.status === "RESOLVED" && complaint.reopenCount < 1 && (
            <ReopenCard complaintId={complaint.id} />
          )}

          {complaint.status === "CLOSED" && (
            <FeedbackCard complaintId={complaint.id} />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComplaintById, submitFeedback, reopenComplaint } from "@/lib/api/complaints";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { initiatePayment } from "@/lib/api/payments";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Zap, CreditCard, Loader2, Star, RefreshCw } from "lucide-react";
import { PaymentPurpose } from "@/types/api";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ComplaintDetail() {
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  
  const { data: complaint, isLoading, error } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchComplaintById(id),
  });

  const [paymentLoading, setPaymentLoading] = useState<PaymentPurpose | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const reopenMutation = useMutation({
    mutationFn: () => reopenComplaint(id),
    onSuccess: () => {
      toast.success("Complaint reopened successfully");
      queryClient.invalidateQueries({ queryKey: ["complaint", id] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to reopen complaint")
  });

  const feedbackMutation = useMutation({
    mutationFn: () => submitFeedback(id, rating, comment),
    onSuccess: () => {
      toast.success("Feedback submitted! Thank you.");
      setFeedbackSubmitted(true);
    },
    onError: (err: any) => toast.error(err.message || "Failed to submit feedback")
  });

  const handlePayment = async (purpose: PaymentPurpose) => {
    setPaymentLoading(purpose);
    try {
      const { payment, sessionUrl } = await initiatePayment(id, purpose);
      sessionStorage.setItem("pendingPaymentId", payment.id);
      window.location.href = sessionUrl;
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate payment");
      setPaymentLoading(null);
    }
  };

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
              
              {complaint.attachments && complaint.attachments.length > 0 && (
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-sm mb-2">Attachments</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {complaint.attachments.map((attachment) => (
                      <div key={attachment.id} className="relative aspect-square rounded-md overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={attachment.url} 
                          alt="Complaint attachment" 
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
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
                <div className="flex gap-2 items-center">
                  <Badge variant={complaint.status === "RESOLVED" || complaint.status === "CLOSED" ? "default" : "secondary"}>{complaint.status}</Badge>
                  {complaint.isPriority && (
                    <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white">
                      <Zap className="h-3 w-3 mr-1" /> Priority
                    </Badge>
                  )}
                </div>
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
              {complaint.isPriority && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-md flex items-start gap-2">
                  <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Priority Confirmed</p>
                    <p className="text-amber-700 mt-1">This complaint has been upgraded. The SLA deadline is accelerated.</p>
                  </div>
                </div>
              )}
            </CardContent>
            {(complaint.status !== "CLOSED" && complaint.status !== "RESOLVED") && (() => {
              const hasPaidServiceCharge = complaint.payments?.some(p => p.purpose === "SERVICE_CHARGE" && p.status === "SUCCEEDED");
              return (
              <CardFooter className="flex flex-col gap-2 border-t pt-4">
                {complaint.category?.basePrice && complaint.status === "SUBMITTED" && (
                  hasPaidServiceCharge ? (
                    <div className="w-full p-3 bg-green-50 text-green-900 border border-green-200 rounded-md flex items-center justify-center gap-2 text-sm font-medium">
                      <CreditCard className="h-4 w-4 text-green-600" />
                      Service Charge Paid
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handlePayment("SERVICE_CHARGE")}
                      disabled={paymentLoading !== null}
                    >
                      {paymentLoading === "SERVICE_CHARGE" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                      Pay Service Charge (${parseFloat(complaint.category.basePrice).toFixed(2)})
                    </Button>
                  )
                )}
                {!complaint.isPriority && (
                  <Button 
                    variant="outline" 
                    className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50" 
                    onClick={() => handlePayment("PRIORITY_FEE")}
                    disabled={paymentLoading !== null}
                  >
                    {paymentLoading === "PRIORITY_FEE" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                    Upgrade to Priority
                  </Button>
                )}
              </CardFooter>
              )
            })()}
          </Card>

          {complaint.status === "RESOLVED" && complaint.reopenCount < 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Issue not resolved?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">You can reopen this complaint if the issue persists. You can only do this once.</p>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:bg-destructive/10"
                  onClick={() => reopenMutation.mutate()}
                  disabled={reopenMutation.isPending}
                >
                  {reopenMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                  Reopen Complaint
                </Button>
              </CardContent>
            </Card>
          )}

          {complaint.status === "CLOSED" && !feedbackSubmitted && (
            <Card>
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Comment</Label>
                  <Textarea placeholder="Tell us about your experience..." value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => feedbackMutation.mutate()}
                  disabled={feedbackMutation.isPending}
                >
                  {feedbackMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          )}

          {complaint.status === "CLOSED" && feedbackSubmitted && (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground text-sm">
                Feedback submitted. Thank you!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

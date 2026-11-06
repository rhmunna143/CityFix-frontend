"use client";

import { memo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitFeedback } from "@/lib/api/complaints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { StarRating } from "./StarRating";

interface FeedbackCardProps {
  complaintId: string;
}

export const FeedbackCard = memo(function FeedbackCard({
  complaintId,
}: FeedbackCardProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => submitFeedback(complaintId, rating, comment),
    onSuccess: () => {
      toast.success("Feedback submitted! Thank you.");
      setDone(true);
    },
    onError: (e: Error) => toast.error(e.message || "Failed to submit feedback"),
  });

  if (done) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-sm text-muted-foreground">
          Feedback submitted. Thank you!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provide Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Rating (1-5)</Label>
          <StarRating value={rating} onChange={setRating} disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback-comment">Comment</Label>
          <Textarea
            id="feedback-comment"
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending}
          />
        </div>
        <Button
          className="w-full cursor-pointer"
          onClick={() => mutate()}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
});

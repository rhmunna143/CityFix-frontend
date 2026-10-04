"use client";

import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPayment, getPaymentBySession } from "@/lib/api/payments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Payment } from "@/types/api";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [pollTimeout, setPollTimeout] = useState(false);

  useEffect(() => {
    // We prioritize session_id from URL if present. If not, fallback to sessionStorage.
    if (!sessionId) {
      const pid = sessionStorage.getItem("pendingPaymentId");
      if (pid) {
        setPaymentId(pid);
      } else {
        setPollTimeout(true); // If no ID and no session_id, skip to generic state
      }
    }

    const timeout = setTimeout(() => {
      setPollTimeout(true);
    }, 30000);
    return () => clearTimeout(timeout);
  }, [sessionId]);

  const { data: payment, error } = useQuery({
    queryKey: ["payment", sessionId || paymentId],
    queryFn: () => {
      if (sessionId) return getPaymentBySession(sessionId);
      return getPayment(paymentId!);
    },
    enabled: !!(sessionId || paymentId),
    refetchInterval: (query) => {
      const data = query.state.data as Payment | undefined;
      if (!data) return !pollTimeout ? 2000 : false;
      return (data.status === "PENDING" && !pollTimeout) ? 2000 : false;
    },
  });

  const isSuccess = payment?.status === "SUCCEEDED";
  const isFailed = payment?.status === "FAILED" || payment?.status === "REFUNDED" || !!error;
  const isPending = !isSuccess && !isFailed && !pollTimeout;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <Card className="max-w-md w-full text-center">
        {isPending ? (
          <CardHeader>
            <div className="flex justify-center mb-4 text-primary">
              <Loader2 className="h-16 w-16 animate-spin" />
            </div>
            <CardTitle className="text-2xl">Processing Payment</CardTitle>
            <CardDescription>
              Please wait while we confirm your payment with Stripe...
            </CardDescription>
          </CardHeader>
        ) : isSuccess ? (
          <CardHeader>
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle className="h-16 w-16" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your payment has been successfully processed. Thank you!
            </CardDescription>
          </CardHeader>
        ) : isFailed ? (
          <CardHeader>
            <div className="flex justify-center mb-4 text-destructive">
              <AlertTriangle className="h-16 w-16" />
            </div>
            <CardTitle className="text-2xl">Payment Failed</CardTitle>
            <CardDescription>
              The payment could not be completed. Please try again.
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <div className="flex justify-center mb-4 text-amber-500">
              <AlertTriangle className="h-16 w-16" />
            </div>
            <CardTitle className="text-2xl">Payment Processing</CardTitle>
            <CardDescription>
              Your payment is still being processed by the webhook. It may take a few moments to reflect.
            </CardDescription>
          </CardHeader>
        )}

        <CardFooter className="flex flex-col gap-2 mt-4">
          {payment?.complaintId ? (
            <Link href={`/dashboard/complaints/${payment.complaintId}`} className={buttonVariants({ className: "w-full" })}>Return to Complaint</Link>
          ) : (
            <Link href="/dashboard/payments" className={buttonVariants({ className: "w-full" })}>View Payment History</Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

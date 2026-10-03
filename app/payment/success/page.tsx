"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPayment } from "@/lib/api/payments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Payment } from "@/types/api";

export default function PaymentSuccessPage() {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [pollTimeout, setPollTimeout] = useState(false);

  useEffect(() => {
    const pid = sessionStorage.getItem("pendingPaymentId");
    if (pid) {
      setPaymentId(pid);
      // Timeout polling after 30 seconds
      const timeout = setTimeout(() => {
        setPollTimeout(true);
      }, 30000);
      return () => clearTimeout(timeout);
    } else {
      setPollTimeout(true); // If no ID, skip right to generic state
    }
  }, []);

  const { data: payment, error } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPayment(paymentId!),
    enabled: !!paymentId && !pollTimeout,
    refetchInterval: (query) => {
      const data = query.state.data as Payment | undefined;
      return (data?.status === "PENDING" && !pollTimeout) ? 2000 : false;
    },
  });

  const isSuccess = payment?.status === "SUCCESS";
  const isPending = (payment?.status === "PENDING" && !pollTimeout) || (!payment && !pollTimeout);
  const isFailed = payment?.status === "FAILED" || payment?.status === "CANCELLED";

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

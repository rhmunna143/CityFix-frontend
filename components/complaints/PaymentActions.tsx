"use client";

import { memo, useState } from "react";
import { initiatePayment } from "@/lib/api/payments";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard, Loader2, Zap } from "lucide-react";
import type { Complaint, PaymentPurpose } from "@/types/api";

interface PaymentActionsProps {
  complaint: Complaint;
}

export const PaymentActions = memo(function PaymentActions({
  complaint,
}: PaymentActionsProps) {
  const [paymentLoading, setPaymentLoading] = useState<PaymentPurpose | null>(
    null
  );

  const handlePayment = async (purpose: PaymentPurpose) => {
    setPaymentLoading(purpose);
    try {
      const { payment, sessionUrl } = await initiatePayment(
        complaint.id,
        purpose
      );
      sessionStorage.setItem("pendingPaymentId", payment.id);
      window.location.href = sessionUrl;
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate payment");
      setPaymentLoading(null);
    }
  };

  const hasPaidServiceCharge = complaint.payments?.some(
    (p) => p.purpose === "SERVICE_CHARGE" && p.status === "SUCCEEDED"
  );

  return (
    <div className="flex flex-col gap-2 border-t pt-4">
      {complaint.category?.basePrice && complaint.status === "SUBMITTED" && (
        hasPaidServiceCharge ? (
          <div className="w-full p-3 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-md flex items-center justify-center gap-2 text-sm font-medium">
            <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
            Service Charge Paid
          </div>
        ) : (
          <Button
            className="w-full cursor-pointer"
            onClick={() => handlePayment("SERVICE_CHARGE")}
            disabled={paymentLoading !== null}
          >
            {paymentLoading === "SERVICE_CHARGE" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            Pay Service Charge ($
            {parseFloat(complaint.category.basePrice).toFixed(2)})
          </Button>
        )
      )}
      {!complaint.isPriority && (
        <Button
          variant="outline"
          className="w-full text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
          onClick={() => handlePayment("PRIORITY_FEE")}
          disabled={paymentLoading !== null}
        >
          {paymentLoading === "PRIORITY_FEE" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          Upgrade to Priority
        </Button>
      )}
    </div>
  );
});

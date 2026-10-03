import { Payment, PaymentInitiateData, Paginated, ApiResponse } from "@/types/api";

export async function initiatePayment(complaintId: string, purpose: 'PRIORITY_FEE' | 'SERVICE_CHARGE'): Promise<PaymentInitiateData> {
  const res = await fetch("/api/proxy/payments/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ complaintId, purpose }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to initiate payment");
  }
  const data: ApiResponse<PaymentInitiateData> = await res.json();
  return data.data;
}

export async function getPayment(id: string): Promise<Payment> {
  const res = await fetch(`/api/proxy/payments/${id}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch payment");
  }
  const data: ApiResponse<Payment> = await res.json();
  return data.data;
}

export async function getPaymentHistory(params?: Record<string, string>): Promise<Paginated<Payment>> {
  const searchParams = new URLSearchParams(params || {});
  const res = await fetch(`/api/proxy/payments/my-history?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch payments");
  }
  const data: ApiResponse<Payment[]> = await res.json();
  return { items: data.data, meta: data.meta! };
}

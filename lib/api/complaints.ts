import { ApiResponse, Complaint, Paginated } from "@/types/api";

export async function fetchComplaints(searchParams: URLSearchParams): Promise<Paginated<Complaint>> {
  const res = await fetch(`/api/proxy/complaints?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch complaints");
  }
  const data: ApiResponse<Complaint[]> = await res.json();
  return {
    items: data.data,
    meta: data.meta!,
  };
}

export async function fetchComplaintById(id: string): Promise<Complaint> {
  const res = await fetch(`/api/proxy/complaints/${id}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch complaint");
  }
  const data: ApiResponse<Complaint> = await res.json();
  return data.data;
}

export async function updateComplaintStatus(id: string, status: string, note?: string): Promise<Complaint> {
  const res = await fetch(`/api/proxy/complaints/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, resolutionNote: note }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update status");
  }
  const data = await res.json();
  return data.data;
}

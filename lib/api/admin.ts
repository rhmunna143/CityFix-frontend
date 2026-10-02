import { ApiResponse, Paginated, User } from "@/types/api";

export async function fetchDashboardStats() {
  const res = await fetch("/api/proxy/admin/dashboard-stats");
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch stats");
  }
  const data = await res.json();
  return data.data;
}

export async function fetchUsers(searchParams: URLSearchParams): Promise<Paginated<User>> {
  const res = await fetch(`/api/proxy/admin/users?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch users");
  }
  const data = await res.json();
  return { items: data.data, meta: data.meta };
}

export async function assignComplaint(complaintId: string, staffId: string) {
  const res = await fetch(`/api/proxy/admin/complaints/${complaintId}/assign`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ staffId })
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to assign complaint");
  }
  const data = await res.json();
  return data.data;
}

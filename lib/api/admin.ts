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

export async function fetchUsers(
  searchParams: URLSearchParams,
): Promise<Paginated<User>> {
  const res = await fetch(`/api/proxy/admin/users?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch users");
  }
  const data = await res.json();
  return { items: data.data, meta: data.meta };
}

export async function assignComplaint(complaintId: string, staffId: string) {
  const res = await fetch(`/api/proxy/complaints/${complaintId}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ staffId }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to assign complaint");
  }
  const data = await res.json();
  return data.data;
}

// Departments CRUD
// Departments CRUD
export async function fetchDepartments(status?: "active" | "deleted" | "all") {
  const url =
    status && status !== "active"
      ? `/api/proxy/departments?status=${status}`
      : "/api/proxy/departments";
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch departments");
  }
  return (await res.json()).data;
}

export async function createDepartment(payload: {
  name: string;
  description?: string;
}) {
  const res = await fetch("/api/proxy/departments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create department");
  }
  return (await res.json()).data;
}

export async function updateDepartment(
  id: string,
  payload: Partial<{ name: string; description: string }>,
) {
  const res = await fetch(`/api/proxy/departments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update department");
  }
  return (await res.json()).data;
}

export async function deleteDepartment(id: string) {
  const res = await fetch(`/api/proxy/departments/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete department");
  }
  return res.json();
}

export async function restoreDepartment(id: string) {
  const res = await fetch(`/api/proxy/departments/${id}/restore`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to restore department");
  }
  return res.json();
}

// Categories CRUD
export async function fetchCategories(status?: "active" | "deleted" | "all") {
  const url =
    status && status !== "active"
      ? `/api/proxy/categories?status=${status}`
      : "/api/proxy/categories";
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch categories");
  }
  return (await res.json()).data;
}

export async function createCategory(payload: any) {
  const res = await fetch("/api/proxy/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create category");
  }
  return (await res.json()).data;
}

export async function updateCategory(id: string, payload: any) {
  const res = await fetch(`/api/proxy/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update category");
  }
  return (await res.json()).data;
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/proxy/categories/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete category");
  }
  return res.json();
}

export async function restoreCategory(id: string) {
  const res = await fetch(`/api/proxy/categories/${id}/restore`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to restore category");
  }
  return res.json();
}

export async function updateUserRole(
  id: string,
  payload: { role: string; departmentId?: string; employeeCode?: string },
) {
  const res = await fetch(`/api/proxy/admin/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update user role");
  return (await res.json()).data;
}

export async function updateUserStatus(id: string, isActive: boolean) {
  const res = await fetch(`/api/proxy/admin/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
  if (!res.ok) throw new Error("Failed to update user status");
  return (await res.json()).data;
}

export async function fetchAuditLogs(searchParams: URLSearchParams) {
  const res = await fetch(
    `/api/proxy/admin/audit-logs?${searchParams.toString()}`,
  );
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch audit logs");
  }
  const data = await res.json();
  return { items: data.data, meta: data.meta };
}

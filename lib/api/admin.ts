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

// Departments CRUD
export async function fetchDepartments() {
  const res = await fetch("/api/proxy/departments");
  if (!res.ok) throw new Error("Failed to fetch departments");
  return (await res.json()).data;
}

export async function createDepartment(payload: { name: string; description?: string }) {
  const res = await fetch("/api/proxy/admin/departments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create department");
  return (await res.json()).data;
}

export async function updateDepartment(id: string, payload: { name: string; description?: string }) {
  const res = await fetch(`/api/proxy/admin/departments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update department");
  return (await res.json()).data;
}

export async function deleteDepartment(id: string) {
  const res = await fetch(`/api/proxy/admin/departments/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete department");
  return res.json();
}

// Categories CRUD
export async function fetchCategories() {
  const res = await fetch("/api/proxy/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return (await res.json()).data;
}

export async function createCategory(payload: any) {
  const res = await fetch("/api/proxy/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create category");
  return (await res.json()).data;
}

export async function updateCategory(id: string, payload: any) {
  const res = await fetch(`/api/proxy/admin/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update category");
  return (await res.json()).data;
}

export async function deleteCategory(id: string) {
  const res = await fetch(`/api/proxy/admin/categories/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}

export async function updateUserRole(id: string, payload: { role: string; departmentId?: string; employeeCode?: string }) {
  const res = await fetch(`/api/proxy/admin/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update user role");
  return (await res.json()).data;
}

export async function updateUserStatus(id: string, isActive: boolean) {
  const res = await fetch(`/api/proxy/admin/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive })
  });
  if (!res.ok) throw new Error("Failed to update user status");
  return (await res.json()).data;
}

export async function fetchAuditLogs(searchParams: URLSearchParams) {
  const res = await fetch(`/api/proxy/admin/audit-logs?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch audit logs");
  }
  const data = await res.json();
  return { items: data.data, meta: data.meta };
}

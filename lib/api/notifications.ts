import { Paginated, ApiResponse } from "@/types/api";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export async function getNotifications(params?: Record<string, string>): Promise<Paginated<Notification>> {
  const searchParams = new URLSearchParams(params || {});

  const res = await fetch(`/api/proxy/notifications?${searchParams.toString()}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch notifications");
  }

  const data: ApiResponse<Notification[]> = await res.json();

  return { items: data.data, meta: data.meta! };
}

export async function markNotificationRead(id: string): Promise<void> {
  const res = await fetch(`/api/proxy/notifications/${id}/read`, {
    method: "PATCH",
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to mark notification as read");
  }
}

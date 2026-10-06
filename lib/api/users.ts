import { User } from "@/types/api";

export async function updateProfile(payload: { name?: string; phone?: string; avatarUrl?: string }): Promise<User> {
  const res = await fetch("/api/proxy/users/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update profile");
  }
  return (await res.json()).data;
}

export async function uploadAvatar(file: File): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `/api/proxy/users/me/avatar`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText).data);
      } else {
        try {
          reject(new Error(JSON.parse(xhr.responseText).message || "Upload failed"));
        } catch {
          reject(new Error("Failed to upload avatar"));
        }
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
}

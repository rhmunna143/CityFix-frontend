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

export async function createComplaint(payload: any): Promise<Complaint> {
  const res = await fetch(`/api/proxy/complaints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create complaint");
  }
  const data = await res.json();
  return data.data;
}

export async function uploadAttachment(complaintId: string, file: File, stage: string, onProgress?: (progress: number) => void): Promise<any> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("stage", stage);
    formData.append("fileType", "IMAGE");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/proxy/complaints/${complaintId}/attachments`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText).data);
      } else {
        try {
          reject(new Error(JSON.parse(xhr.responseText).message || "Upload failed"));
        } catch (e) {
          reject(new Error("Upload failed"));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed due to network error"));
    };

    xhr.send(formData);
  });
}

export async function submitFeedback(complaintId: string, rating: number, comment: string): Promise<any> {
  const res = await fetch(`/api/proxy/complaints/${complaintId}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, comment }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to submit feedback");
  }
  
  return res.json();
}

export async function reopenComplaint(id: string): Promise<Complaint> {
  const res = await fetch(`/api/proxy/complaints/${id}/reopen`, {
    method: "POST",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to reopen complaint");
  }
  const data = await res.json();
  return data.data;
}

export async function fetchCitizenStats() {
  const res = await fetch('/api/proxy/complaints/stats/citizen');
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch citizen stats");
  }
  const data = await res.json();
  return data.data;
}

export async function fetchStaffStats() {
  const res = await fetch('/api/proxy/complaints/stats/staff');
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch staff stats");
  }
  const data = await res.json();
  return data.data;
}

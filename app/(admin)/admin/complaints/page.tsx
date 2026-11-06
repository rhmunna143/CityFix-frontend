"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchComplaints, deleteComplaint } from "@/lib/api/complaints";
import { assignComplaint, fetchUsers, fetchDepartments } from "@/lib/api/admin";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { SearchInput } from "@/components/shared/SearchInput";
import { useUrlState } from "@/hooks/useUrlState";
import { useListQuery } from "@/hooks/useListQuery";
import { Complaint, Department } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Loader2, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function HoistedAssignDialog({
  complaint,
  onClose,
}: {
  complaint: Complaint | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [selectedStaff, setSelectedStaff] = useState<string>("");

  const isOpen = complaint !== null;

  const { data: staffData, isLoading: staffLoading } = useQuery({
    queryKey: ["users", "STAFF"],
    queryFn: () => {
      const params = new URLSearchParams();
      params.set("role", "STAFF");
      params.set("limit", "100");
      return fetchUsers(params);
    },
    enabled: isOpen,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments", "all"],
    queryFn: () => fetchDepartments("all"),
    enabled: isOpen,
  });

  const assignMutation = useMutation({
    mutationFn: (staffId: string) => {
      if (!complaint) throw new Error("No complaint selected");
      return assignComplaint(complaint.id, staffId);
    },
    onSuccess: () => {
      toast.success("Complaint assigned successfully.");
      onClose();
      setSelectedStaff("");
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to assign complaint.");
    },
  });

  const getStaffDisplayText = (staffId: string) => {
    const staff = staffData?.items?.find((s: any) => s.id === staffId);
    if (!staff) return "";
    const dept = departments?.find(
      (d: Department) => d.id === staff.staffProfile?.departmentId
    )?.name;
    return `${staff.name} - ${
      dept ? dept.replace(/_DELETED_\d+$/, "") : "No Dept"
    }`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff to Complaint</DialogTitle>
          <DialogDescription>
            Assign {complaint?.referenceCode} to a staff member.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Select
            value={selectedStaff}
            onValueChange={(val) => setSelectedStaff(val || "")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select staff member">
                {selectedStaff
                  ? getStaffDisplayText(selectedStaff)
                  : undefined}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-w-[90vw]">
              {staffLoading ? (
                <SelectItem value="loading" disabled>
                  Loading staff...
                </SelectItem>
              ) : (
                staffData?.items?.map((staff: any) => {
                  const dept = departments?.find(
                    (d: Department) => d.id === staff.staffProfile?.departmentId
                  )?.name;
                  return (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name} -{" "}
                      {dept ? dept.replace(/_DELETED_\d+$/, "") : "No Dept"}
                    </SelectItem>
                  );
                })
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!selectedStaff || assignMutation.isPending}
            onClick={() => assignMutation.mutate(selectedStaff)}
          >
            {assignMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminComplaintsPage() {
  const queryClient = useQueryClient();
  const { updateUrl, get } = useUrlState();
  const status = get("status");
  const limit = get("limit", "20");

  const [assignTarget, setAssignTarget] = useState<Complaint | null>(null);

  const { data, isLoading, isPlaceholderData, error } = useListQuery<Complaint>(
    ["complaints", "admin"],
    fetchComplaints
  );

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: () => {
      toast.success("Complaint deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to delete complaint"),
  });

  const columns = useMemo<Column<Complaint>[]>(
    () => [
      { header: "Reference", accessorKey: "referenceCode" as keyof Complaint },
      { header: "Title", accessorKey: "title" as keyof Complaint },
      {
        header: "Department",
        cell: (c: Complaint) => c.department?.name || "N/A",
      },
      {
        header: "Status",
        cell: (c: Complaint) => (
          <Badge
            variant={
              c.status === "RESOLVED" || c.status === "CLOSED"
                ? "default"
                : "secondary"
            }
          >
            {c.status}
          </Badge>
        ),
      },
      {
        header: "Date",
        cell: (c: Complaint) => format(new Date(c.createdAt), "PP"),
      },
      {
        header: "Actions",
        cell: (c: Complaint) => (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setAssignTarget(c)}
            >
              <UserPlus className="h-4 w-4 mr-1" /> Assign
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 cursor-pointer h-8 px-2"
              title="Delete complaint"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete complaint ${c.referenceCode}?`
                  )
                ) {
                  deleteMutation.mutate(c.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteMutation]
  );

  if (error) {
    return (
      <div className="p-4 text-destructive">
        Error loading complaints: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Complaints"
        description="Manage and assign complaints."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput />
        <div className="flex gap-4 items-center flex-wrap">
          <SelectFilter
            value={status}
            onValueChange={(val) => updateUrl({ status: val })}
            options={[
              { label: "Submitted", value: "SUBMITTED" },
              { label: "Assigned", value: "ASSIGNED" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Resolved", value: "RESOLVED" },
              { label: "Closed", value: "CLOSED" },
            ]}
            placeholder="Status"
          />

          <SelectFilter
            value={limit}
            onValueChange={(val) => updateUrl({ limit: val, page: "1" })}
            options={[
              { label: "20 / page", value: "20" },
              { label: "100 / page", value: "100" },
              { label: "500 / page", value: "500" },
              { label: "1000 / page", value: "1000" },
            ]}
            placeholder="Page Size"
          />
        </div>
      </div>

      <div className={isPlaceholderData ? "opacity-60 transition-opacity" : ""}>
        <DataTable
          data={data?.items || []}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No complaints found."
          getRowId={(c) => c.id}
          virtualizeAbove={100}
        />
      </div>

      {data?.meta && (
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          onPageChange={(p) => updateUrl({ page: p.toString() })}
        />
      )}

      <HoistedAssignDialog
        complaint={assignTarget}
        onClose={() => setAssignTarget(null)}
      />
    </div>
  );
}

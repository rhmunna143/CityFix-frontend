"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComplaints } from "@/lib/api/complaints";
import { assignComplaint, fetchUsers } from "@/lib/api/admin";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { SearchInput } from "@/components/shared/SearchInput";
import { useUrlState } from "@/hooks/useUrlState";
import { Complaint } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { fetchDepartments } from "@/lib/api/admin";
import { Department } from "@/types/api";

function AssignDialog({ complaint }: { complaint: Complaint }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string>("");

  const { data: staffData, isLoading: staffLoading } = useQuery({
    queryKey: ["users", "STAFF"],
    queryFn: () => {
      const params = new URLSearchParams();
      params.set("role", "STAFF");
      params.set("limit", "100");
      return fetchUsers(params);
    },
    enabled: open,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments", "all"],
    queryFn: () => fetchDepartments("all"),
    enabled: open,
  });

  const assignMutation = useMutation({
    mutationFn: (staffId: string) => assignComplaint(complaint.id, staffId),
    onSuccess: () => {
      toast.success("Complaint assigned successfully.");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to assign complaint.");
    },
  });

  const isChargeableAndUnpaid = false;

  const getStaffDisplayText = (staffId: string) => {
    const staff = staffData?.items?.find((s: any) => s.id === staffId);
    if (!staff) return "";
    const dept = departments?.find((d: Department) => d.id === staff.staffProfile?.departmentId)?.name;
    return `${staff.name} - ${dept ? dept.replace(/_DELETED_\d+$/, '') : 'No Dept'}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        <UserPlus className="h-4 w-4 mr-1" /> Assign
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Staff to Complaint</DialogTitle>
          <DialogDescription>
            Assign this complaint to a staff member.
          </DialogDescription>
        </DialogHeader>
        
        {isChargeableAndUnpaid ? (
           <div className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/10 rounded-md">
             <AlertCircle className="h-4 w-4" />
             This complaint is chargeable and currently unpaid. Assignment is disabled.
           </div>
        ) : (
          <div className="space-y-4 py-4">
             <Select value={selectedStaff} onValueChange={(val) => setSelectedStaff(val || "")}>
               <SelectTrigger className="w-full">
                 <SelectValue placeholder="Select staff member">
                   {selectedStaff ? getStaffDisplayText(selectedStaff) : undefined}
                 </SelectValue>
               </SelectTrigger>
               <SelectContent className="max-w-[90vw]">
                 {staffLoading ? (
                   <SelectItem value="loading" disabled>Loading staff...</SelectItem>
                 ) : (
                   staffData?.items?.map((staff: any) => {
                     const dept = departments?.find((d: Department) => d.id === staff.staffProfile?.departmentId)?.name;
                     return (
                       <SelectItem key={staff.id} value={staff.id}>
                         {staff.name} - {dept ? dept.replace(/_DELETED_\d+$/, '') : 'No Dept'}
                       </SelectItem>
                     );
                   })
                 )}
               </SelectContent>
             </Select>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            disabled={!selectedStaff || isChargeableAndUnpaid || assignMutation.isPending} 
            onClick={() => assignMutation.mutate(selectedStaff)}
          >
            {assignMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminComplaintsPage() {
  const { searchParams, updateUrl, get } = useUrlState();
  const status = get("status");

  const { data, isLoading, error } = useQuery({
    queryKey: ["complaints", "admin", searchParams.toString()],
    queryFn: () => fetchComplaints(searchParams),
  });

  const columns = [
    { header: "Reference", accessorKey: "referenceCode" as keyof Complaint },
    { header: "Title", accessorKey: "title" as keyof Complaint },
    { header: "Department", cell: (c: Complaint) => c.department?.name || "N/A" },
    { 
      header: "Status", 
      cell: (c: Complaint) => (
        <Badge variant={c.status === "RESOLVED" || c.status === "CLOSED" ? "default" : "secondary"}>
          {c.status}
        </Badge>
      ) 
    },
    { header: "Date", cell: (c: Complaint) => format(new Date(c.createdAt), "PP") },
    { 
      header: "Actions", 
      cell: (c: Complaint) => <AssignDialog complaint={c} />
    },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading complaints: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="All Complaints" 
        description="Manage and assign complaints."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput />
        <div className="flex gap-4 items-center">
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
        </div>
      </div>

      <DataTable 
        data={data?.items || []} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="No complaints found."
      />

      {data?.meta && (
        <Pagination 
          currentPage={data.meta.page} 
          totalPages={data.meta.totalPages} 
          onPageChange={(p) => updateUrl({ page: p.toString() })}
        />
      )}
    </div>
  );
}

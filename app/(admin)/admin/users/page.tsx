"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUserRole, updateUserStatus, fetchDepartments } from "@/lib/api/admin";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { useUrlState } from "@/hooks/useUrlState";
import { User, Department } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { MoreHorizontal, Loader2, ShieldAlert, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { searchParams, updateUrl, get } = useUrlState();
  const queryClient = useQueryClient();
  const role = get("role");

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Form State
  const [newRole, setNewRole] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "admin", searchParams.toString()],
    queryFn: () => fetchUsers(searchParams),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const roleMutation = useMutation({
    mutationFn: (payload: any) => updateUserRole(selectedUser!.id, payload),
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsRoleDialogOpen(false);
    },
    onError: (err: any) => toast.error(err.message || "Failed to update role"),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string, isActive: boolean }) => updateUserStatus(id, isActive),
    onSuccess: (_, variables) => {
      toast.success(`User ${variables.isActive ? 'activated' : 'deactivated'}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to update status"),
  });

  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setDepartmentId(user.staffProfile?.departmentId || "");
    setEmployeeCode(user.staffProfile?.employeeCode || "");
    setIsRoleDialogOpen(true);
  };

  const handleRoleSave = () => {
    const payload: any = { role: newRole };
    if (newRole === "STAFF") {
      if (!departmentId || !employeeCode) {
        return toast.error("Department and Employee Code are required for Staff");
      }
      payload.departmentId = departmentId;
      payload.employeeCode = employeeCode;
    }
    roleMutation.mutate(payload);
  };

  const columns = [
    { header: "Name", accessorKey: "name" as keyof User },
    { header: "Email", accessorKey: "email" as keyof User },
    { 
      header: "Status", 
      cell: (u: User) => (
        <Badge variant={u.isActive ? "default" : "destructive"}>
          {u.isActive ? "Active" : "Inactive"}
        </Badge>
      ) 
    },
    { 
      header: "Role & Dept", 
      cell: (u: User) => {
        const dept = u.staffProfile?.departmentId 
          ? departments?.find((d: Department) => d.id === u.staffProfile?.departmentId)?.name 
          : null;
        
        return (
          <div className="flex flex-col gap-1 items-start">
            <Badge variant={u.role === "ADMIN" || u.role === "SUPER_ADMIN" ? "default" : u.role === "STAFF" ? "secondary" : "outline"}>
              {u.role}
            </Badge>
            {dept && <span className="text-xs text-muted-foreground">{dept.replace(/_DELETED_\d+$/, '')}</span>}
          </div>
        )
      } 
    },
    { header: "Joined", cell: (u: User) => format(new Date(u.createdAt), "PP") },
    { 
      header: "Actions", 
      cell: (u: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openRoleDialog(u)}>
              <ShieldAlert className="mr-2 h-4 w-4" /> Edit Role & Dept
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => statusMutation.mutate({ id: u.id, isActive: !u.isActive })}
              className={u.isActive ? "text-destructive" : "text-green-600"}
            >
              {u.isActive ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
              {u.isActive ? "Deactivate User" : "Activate User"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) 
    },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading users: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="User Management" 
        description="View and manage system users."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput />
        <div className="flex gap-4 items-center">
          <SelectFilter 
            value={role} 
            onValueChange={(val) => updateUrl({ role: val })}
            options={[
              { label: "Citizen", value: "CITIZEN" },
              { label: "Staff", value: "STAFF" },
              { label: "Admin", value: "ADMIN" },
            ]}
            placeholder="Role"
          />
        </div>
      </div>

      <DataTable 
        data={data?.items || []} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="No users found."
      />

      {data?.meta && (
        <Pagination 
          currentPage={data.meta.page} 
          totalPages={data.meta.totalPages} 
          onPageChange={(p) => updateUrl({ page: p.toString() })}
        />
      )}

      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the system role for {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v || "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CITIZEN">Citizen</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newRole === "STAFF" && (
              <>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={departmentId} onValueChange={(v) => setDepartmentId(v || "")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a department">
                        {departmentId 
                          ? departments?.find((d: Department) => d.id === departmentId)?.name.replace(/_DELETED_\d+$/, '') 
                          : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map((dept: Department) => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name.replace(/_DELETED_\d+$/, '')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Employee Code</Label>
                  <Input placeholder="e.g. EMP123" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)} disabled={roleMutation.isPending}>Cancel</Button>
            <Button onClick={handleRoleSave} disabled={roleMutation.isPending}>
              {roleMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

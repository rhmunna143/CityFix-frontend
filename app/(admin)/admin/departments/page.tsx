"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment, restoreDepartment } from "@/lib/api/admin";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { Department } from "@/types/api";

export default function DepartmentsPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [statusFilter, setStatusFilter] = useState<'active' | 'deleted' | 'all'>('active');
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments", statusFilter],
    queryFn: () => fetchDepartments(statusFilter),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: Partial<{ name: string; description: string }>) => {
      if (editingDept) {
        return updateDepartment(editingDept.id, payload);
      }
      return createDepartment(payload as { name: string; description?: string });
    },
    onSuccess: () => {
      toast.success(editingDept ? "Department updated" : "Department created");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.message || "Failed to save department"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      toast.success("Department deleted");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete department"),
  });

  const restoreMutation = useMutation({
    mutationFn: restoreDepartment,
    onSuccess: () => {
      toast.success("Department restored");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to restore department"),
  });

  const resetForm = () => {
    setEditingDept(null);
    setName("");
    setDescription("");
  };

  const openEdit = (dept: Department) => {
    setEditingDept(dept);
    setName(dept.name.replace(/_DELETED_\d+$/, '')); // Strip suffix if they want to edit it
    setDescription(dept.description || "");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return toast.error("Name is required");
    
    const payload: Partial<{ name: string; description: string }> = { description };
    if (!editingDept || name !== editingDept.name.replace(/_DELETED_\d+$/, '')) {
      payload.name = name;
    }
    
    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PageHeader title="Departments" description="Manage city departments and their details." />
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={statusFilter === 'active' ? 'secondary' : 'ghost'} size="sm" onClick={() => setStatusFilter('active')}>Active</Button>
        <Button variant={statusFilter === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setStatusFilter('all')}>All</Button>
        <Button variant={statusFilter === 'deleted' ? 'secondary' : 'ghost'} size="sm" onClick={() => setStatusFilter('deleted')} className="text-destructive">Trash</Button>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : !departments || departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No departments found in {statusFilter} view.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((dept: Department) => {
                const isDeleted = dept.deletedAt != null || dept.isActive === false;
                const displayName = dept.name.replace(/_DELETED_\d+$/, '');
                
                return (
                <TableRow key={dept.id} className={isDeleted ? "opacity-60 bg-muted/30" : ""}>
                  <TableCell className="font-medium">
                    {displayName}
                    {isDeleted && <span className="ml-2 text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">Deleted</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-[300px]">{dept.description || "—"}</TableCell>
                  <TableCell>{isDeleted ? 'Inactive' : 'Active'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {isDeleted ? (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          title="Restore"
                          onClick={() => {
                            if (confirm(`Are you sure you want to restore ${displayName}?`)) {
                              restoreMutation.mutate(dept.id);
                            }
                          }}
                        >
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => openEdit(dept)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${displayName}?`)) {
                                deleteMutation.mutate(dept.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )})
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDept ? "Edit Department" : "Add Department"}</DialogTitle>
            <DialogDescription>
              {editingDept ? "Update the details of the department." : "Create a new department to categorize complaints."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="e.g. Public Works" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Handles roads, bridges, and infrastructure..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saveMutation.isPending}>Cancel</Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

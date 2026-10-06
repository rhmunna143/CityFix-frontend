"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
  fetchDepartments,
} from "@/lib/api/admin";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { Category, Department } from "@/types/api";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "active" | "deleted" | "all"
  >("active");

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [slaHours, setSlaHours] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", statusFilter],
    queryFn: () => fetchCategories(statusFilter),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments", "all"],
    queryFn: () => fetchDepartments("all"),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: any) => {
      if (editingCategory) {
        return updateCategory(editingCategory.id, payload);
      }
      return createCategory(payload);
    },
    onSuccess: () => {
      toast.success(editingCategory ? "Category updated" : "Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to save category"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to delete category"),
  });

  const restoreMutation = useMutation({
    mutationFn: restoreCategory,
    onSuccess: () => {
      toast.success("Category restored");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to restore category"),
  });

  const resetForm = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setDepartmentId("");
    setSlaHours("");
    setBasePrice("");
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name.replace(/_DELETED_\d+$/, ""));
    setDescription(category.description || "");
    setDepartmentId(category.departmentId || "");
    setSlaHours(category.slaHours ? category.slaHours.toString() : "");
    setBasePrice(category.basePrice || "");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!departmentId || departmentId === "unassigned")
      return toast.error("Department is required");

    const payload: any = { description };
    if (
      !editingCategory ||
      name !== editingCategory.name.replace(/_DELETED_\d+$/, "")
    ) {
      payload.name = name;
    }

    if (departmentId) payload.departmentId = departmentId;
    if (slaHours) payload.slaHours = parseInt(slaHours);
    if (basePrice) payload.basePrice = parseFloat(basePrice);

    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <PageHeader
          title="Categories"
          description="Manage complaint categories, SLA timings, and base prices."
        />
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={statusFilter === "active" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === "all" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "deleted" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setStatusFilter("deleted")}
          className="text-destructive"
        >
          Trash
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>SLA (Hours)</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-25 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : !categories || categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No categories found in {statusFilter} view.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat: Category) => {
                const dept = departments?.find(
                  (d: Department) => d.id === cat.departmentId,
                );
                const isDeleted =
                  cat.deletedAt != null || cat.isActive === false;
                const displayName = cat.name.replace(/_DELETED_\d+$/, "");

                return (
                  <TableRow
                    key={cat.id}
                    className={isDeleted ? "opacity-60 bg-muted/30" : ""}
                  >
                    <TableCell className="font-medium">
                      {displayName}
                      {isDeleted && (
                        <span className="ml-2 text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                          Deleted
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {dept?.name
                        ? dept.name.replace(/_DELETED_\d+$/, "")
                        : "—"}
                    </TableCell>
                    <TableCell>{cat.slaHours || "—"}</TableCell>
                    <TableCell>
                      {cat.basePrice
                        ? `$${parseFloat(cat.basePrice).toFixed(2)}`
                        : "—"}
                    </TableCell>
                    <TableCell>{isDeleted ? "Inactive" : "Active"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {isDeleted ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            title="Restore"
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to restore ${displayName}?`,
                                )
                              ) {
                                restoreMutation.mutate(cat.id);
                              }
                            }}
                          >
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(cat)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to delete ${displayName}?`,
                                  )
                                ) {
                                  deleteMutation.mutate(cat.id);
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the details of the category."
                : "Create a new category."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="e.g. Potholes"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={departmentId}
                onValueChange={(v) => setDepartmentId(v || "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department">
                    {departmentId
                      ? departments
                          ?.find((d: Department) => d.id === departmentId)
                          ?.name.replace(/_DELETED_\d+$/, "")
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {departments?.map((dept: Department) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name.replace(/_DELETED_\d+$/, "")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Category description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SLA (Hours)</Label>
                <Input
                  type="number"
                  placeholder="48"
                  value={slaHours}
                  onChange={(e) => setSlaHours(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Base Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={saveMutation.isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComplaints, fetchCitizenStats, deleteComplaint } from "@/lib/api/complaints";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { StatCard } from "@/components/shared/StatCard";
import { useUrlState } from "@/hooks/useUrlState";
import { Complaint } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle, Eye, Trash2, FileText, Clock, CheckCircle, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { searchParams, updateUrl, get, getPage } = useUrlState();
  const page = getPage();
  const status = get("status");
  const sort = get("sort", "-createdAt");

  const { data, isLoading, error } = useQuery({
    queryKey: ["complaints", searchParams.toString()],
    queryFn: () => fetchComplaints(searchParams),
  });

  const { data: stats } = useQuery({
    queryKey: ["citizen-stats"],
    queryFn: () => fetchCitizenStats(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteComplaint(id),
    onSuccess: () => {
      toast.success("Complaint deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      queryClient.invalidateQueries({ queryKey: ["citizen-stats"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete complaint"),
  });

  // Derived or fetched counts
  const totalCount = stats?.totalComplaints ?? data?.meta?.total ?? 0;
  const activeCount = stats?.activeCount ?? 0;
  const resolvedCount = stats?.resolvedCount ?? 0;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  const columns = [
    { header: "Reference", accessorKey: "referenceCode" as keyof Complaint },
    { header: "Title", accessorKey: "title" as keyof Complaint },
    { header: "Category", cell: (c: Complaint) => c.category?.name || "N/A" },
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
      cell: (c: Complaint) => (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/complaints/${c.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <Eye className="h-4 w-4 mr-1"/> View
          </Link>
          {c.status === "SUBMITTED" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 cursor-pointer h-8 px-2"
              title="Delete complaint (Available while submitted)"
              onClick={() => {
                if (window.confirm(`Are you sure you want to cancel and delete complaint ${c.referenceCode}?`)) {
                  deleteMutation.mutate(c.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) 
    },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading complaints: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Citizen Dashboard" 
        description="Track and manage your submitted complaints and view performance metrics."
        action={
          <Link href="/dashboard/complaints/new" className={buttonVariants({ variant: "default" })}>
            <PlusCircle className="h-4 w-4 mr-2" /> Report Issue
          </Link>
        }
      />

      {/* Analytics Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reported"
          value={totalCount}
          description="All grievances submitted"
          icon={<FileText className="h-4 w-4 text-primary" />}
          onClick={() => updateUrl({ status: "" })}
        />
        <StatCard
          title="In Progress"
          value={activeCount}
          description="Under active handling"
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          onClick={() => updateUrl({ status: "IN_PROGRESS" })}
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          description="Successfully resolved issues"
          icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}
          onClick={() => updateUrl({ status: "RESOLVED" })}
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          description={stats?.slaBreachedCount ? `${stats.slaBreachedCount} overdue` : "Overall resolution rate"}
          icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
        />
      </div>

      {/* Category breakdown badges if present */}
      {stats?.complaintsByCategory && stats.complaintsByCategory.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50 text-xs">
          <span className="font-semibold flex items-center gap-1.5 text-muted-foreground mr-1">
            <BarChart3 className="h-3.5 w-3.5" /> Issues by Category:
          </span>
          {stats.complaintsByCategory.map((cat: { name: string; value: number }) => (
            <Badge key={cat.name} variant="outline" className="px-2 py-0.5 gap-1 bg-background">
              <span>{cat.name}</span>
              <span className="font-semibold text-primary">({cat.value})</span>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-4 items-center">
        <SelectFilter 
          value={status} 
          onValueChange={(val) => updateUrl({ status: val })}
          options={[
            { label: "Submitted", value: "SUBMITTED" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Resolved", value: "RESOLVED" },
            { label: "Closed", value: "CLOSED" },
          ]}
          placeholder="Status"
        />
        <SelectFilter 
          value={sort} 
          onValueChange={(val) => updateUrl({ sort: val })}
          options={[
            { label: "Newest First", value: "-createdAt" },
            { label: "Oldest First", value: "createdAt" },
          ]}
          placeholder="Sort by"
          allowClear={false}
        />
      </div>

      <DataTable 
        data={data?.items || []} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="You haven't reported any complaints matching these filters."
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

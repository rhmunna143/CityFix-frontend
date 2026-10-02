"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchComplaints } from "@/lib/api/complaints";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { useUrlState } from "@/hooks/useUrlState";
import { Complaint } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardPage() {
  const { searchParams, updateUrl, get, getPage } = useUrlState();
  const page = getPage();
  const status = get("status");
  const sort = get("sort", "-createdAt");

  const { data, isLoading, error } = useQuery({
    queryKey: ["complaints", searchParams.toString()],
    queryFn: () => fetchComplaints(searchParams),
  });

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
        <Link href={`/dashboard/complaints/${c.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <Eye className="h-4 w-4 mr-1"/> View
        </Link>
      ) 
    },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading complaints: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Complaints" 
        description="Track and manage the issues you've reported."
        action={
          <Link href="/dashboard/complaints/new" className={buttonVariants({ variant: "default" })}>
            <PlusCircle className="h-4 w-4 mr-2" /> Report Issue
          </Link>
        }
      />

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

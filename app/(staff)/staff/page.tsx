"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchComplaints } from "@/lib/api/complaints";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { SearchInput } from "@/components/shared/SearchInput";
import { useUrlState } from "@/hooks/useUrlState";
import { Complaint } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Eye, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function StaffQueuePage() {
  const { searchParams, updateUrl, get, getPage } = useUrlState();
  const page = getPage();
  const status = get("status");
  const sort = get("sort", "slaDeadline");

  const { data, isLoading, error } = useQuery({
    queryKey: ["complaints", "staff", searchParams.toString()],
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
    { 
      header: "SLA Deadline", 
      cell: (c: Complaint) => (
        <span className={c.isSlaBreached ? "text-destructive font-semibold flex items-center" : "flex items-center"}>
          <Clock className="h-3 w-3 mr-1" />
          {format(new Date(c.slaDeadline), "PP")}
        </span>
      ) 
    },
    { 
      header: "Actions", 
      cell: (c: Complaint) => (
        <Link href={`/staff/complaints/${c.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <Eye className="h-4 w-4 mr-1"/> Review
        </Link>
      ) 
    },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading queue: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Queue" 
        description="Complaints assigned to you for resolution."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput />
        <div className="flex gap-4 items-center">
          <SelectFilter 
            value={status} 
            onValueChange={(val) => updateUrl({ status: val })}
            options={[
              { label: "Assigned", value: "ASSIGNED" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Resolved", value: "RESOLVED" },
            ]}
            placeholder="Status"
          />
          <SelectFilter 
            value={sort} 
            onValueChange={(val) => updateUrl({ sort: val })}
            options={[
              { label: "SLA Deadline (Earliest)", value: "slaDeadline" },
              { label: "Newest First", value: "-createdAt" },
            ]}
            placeholder="Sort by"
            allowClear={false}
          />
        </div>
      </div>

      <DataTable 
        data={data?.items || []} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="Your queue is empty."
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAuditLogs } from "@/lib/api/admin";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { useUrlState } from "@/hooks/useUrlState";
import { AuditLog } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { format } from "date-fns";

export default function AdminAuditLogsPage() {
  const { searchParams, updateUrl, get } = useUrlState();
  const action = get("action");

  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-logs", searchParams.toString()],
    queryFn: () => fetchAuditLogs(searchParams),
  });

  const columns = [
    { header: "Action", accessorKey: "action" as keyof AuditLog, cell: (l: AuditLog) => <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{l.action}</span> },
    { header: "User", cell: (l: AuditLog) => l.user?.email || l.userId || "System" },
    { header: "Resource ID", cell: (l: AuditLog) => l.resourceId ? <span className="font-mono text-xs">{l.resourceId.split("-")[0]}</span> : "—" },
    { header: "Details", cell: (l: AuditLog) => <span className="text-muted-foreground text-sm truncate max-w-[300px] block">{JSON.stringify(l.details)}</span> },
    { header: "Date", cell: (l: AuditLog) => format(new Date(l.createdAt), "PPp") },
  ];

  if (error) {
    return <div className="p-4 text-destructive">Error loading audit logs: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Audit Logs" 
        description="View system activity and changes."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput placeholder="Search user ID or resource ID..." />
        <div className="flex gap-4 items-center">
          <SelectFilter 
            value={action} 
            onValueChange={(val) => updateUrl({ action: val })}
            options={[
              { label: "CREATE", value: "CREATE" },
              { label: "UPDATE", value: "UPDATE" },
              { label: "DELETE", value: "DELETE" },
              { label: "LOGIN", value: "LOGIN" },
              { label: "STATUS_CHANGE", value: "STATUS_CHANGE" },
            ]}
            placeholder="Action"
          />
        </div>
      </div>

      <DataTable 
        data={data?.items || []} 
        columns={columns} 
        isLoading={isLoading} 
        emptyMessage="No audit logs found."
      />

      {data?.meta && data.meta.totalPages > 1 && (
        <Pagination 
          currentPage={data.meta.page} 
          totalPages={data.meta.totalPages} 
          onPageChange={(p) => updateUrl({ page: p.toString() })}
        />
      )}
    </div>
  );
}

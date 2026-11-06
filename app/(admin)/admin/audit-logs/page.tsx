"use client";

import { fetchAuditLogs } from "@/lib/api/admin";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { useUrlState } from "@/hooks/useUrlState";
import { useListQuery } from "@/hooks/useListQuery";
import { AuditLog } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { format } from "date-fns";

const AUDIT_LOG_COLUMNS: Column<AuditLog>[] = [
  {
    header: "Action",
    accessorKey: "action" as keyof AuditLog,
    cell: (l: AuditLog) => (
      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
        {l.action}
      </span>
    ),
  },
  {
    header: "User",
    cell: (l: AuditLog) => l.user?.email || l.userId || "System",
  },
  {
    header: "Resource ID",
    cell: (l: AuditLog) =>
      l.resourceId ? (
        <span className="font-mono text-xs">{l.resourceId.split("-")[0]}</span>
      ) : (
        "—"
      ),
  },
  {
    header: "Details",
    cell: (l: AuditLog) => (
      <span className="text-muted-foreground text-sm truncate max-w-[300px] block">
        {JSON.stringify(l.details)}
      </span>
    ),
  },
  {
    header: "Date",
    cell: (l: AuditLog) => format(new Date(l.createdAt), "PPp"),
  },
];

export default function AdminAuditLogsPage() {
  const { updateUrl, get } = useUrlState();
  const action = get("action");
  const limit = get("limit", "20");

  const { data, isLoading, isPlaceholderData, error } = useListQuery<AuditLog>(
    ["audit-logs"],
    fetchAuditLogs
  );

  if (error) {
    return (
      <div className="p-4 text-destructive">
        Error loading audit logs: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="View system activity and changes."
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <SearchInput placeholder="Search user ID or resource ID..." />
        <div className="flex gap-4 items-center flex-wrap">
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
          columns={AUDIT_LOG_COLUMNS}
          isLoading={isLoading}
          emptyMessage="No audit logs found."
          getRowId={(l) => l.id}
          virtualizeAbove={100}
        />
      </div>

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

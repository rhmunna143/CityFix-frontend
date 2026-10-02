"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api/admin";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { useUrlState } from "@/hooks/useUrlState";
import { User } from "@/types/api";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminUsersPage() {
  const { searchParams, updateUrl, get } = useUrlState();
  const role = get("role");

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "admin", searchParams.toString()],
    queryFn: () => fetchUsers(searchParams),
  });

  const columns = [
    { header: "Name", accessorKey: "name" as keyof User },
    { header: "Email", accessorKey: "email" as keyof User },
    { 
      header: "Role", 
      cell: (u: User) => (
        <Badge variant={u.role === "ADMIN" || u.role === "SUPER_ADMIN" ? "default" : u.role === "STAFF" ? "secondary" : "outline"}>
          {u.role}
        </Badge>
      ) 
    },
    { header: "Joined", cell: (u: User) => format(new Date(u.createdAt), "PP") },
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
    </div>
  );
}

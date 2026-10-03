"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory } from "@/lib/api/payments";
import { useUrlState } from "@/hooks/useUrlState";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function PaymentsPage() {
  const { searchParams, getPage, updateUrl } = useUrlState();

  const { data, isLoading } = useQuery({
    queryKey: ["payments", searchParams.toString()],
    queryFn: () => getPaymentHistory(Object.fromEntries(searchParams.entries())),
  });

  const columns = [
    { key: "id", header: "Transaction ID", render: (p: any) => <span className="font-mono text-xs">{p.id.split("-")[0]}</span> },
    { key: "purpose", header: "Purpose", render: (p: any) => p.purpose.replace("_", " ") },
    { key: "amount", header: "Amount", render: (p: any) => `$${parseFloat(p.amount).toFixed(2)}` },
    { 
      key: "status", 
      header: "Status", 
      render: (p: any) => (
        <Badge variant={p.status === "SUCCESS" ? "default" : p.status === "FAILED" || p.status === "CANCELLED" ? "destructive" : "secondary"}>
          {p.status}
        </Badge>
      )
    },
    { key: "createdAt", header: "Date", render: (p: any) => format(new Date(p.createdAt), "MMM d, yyyy") },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Payment History" description="View all your priority fees and service charges." />
      <DataTable
        columns={columns}
        data={data?.items || []}
        isLoading={isLoading}
        emptyMessage="No payments found."
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

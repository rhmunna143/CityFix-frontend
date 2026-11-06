import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { SkeletonTable } from "./Skeletons";
import type { VirtualDataTableProps } from "./VirtualDataTable";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
}

const VirtualDataTable = dynamic(
  () => import("./VirtualDataTable").then((m) => m.VirtualDataTable),
  { loading: () => <SkeletonTable /> }
) as <T>(props: VirtualDataTableProps<T>) => ReactNode;

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  getRowId?: (row: T) => string;
  virtualizeAbove?: number;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  emptyMessage = "No results found.",
  getRowId,
  virtualizeAbove = 100,
}: DataTableProps<T>) {
  if (isLoading) {
    return <SkeletonTable />;
  }

  if (data.length > virtualizeAbove && getRowId) {
    return (
      <VirtualDataTable
        data={data}
        columns={columns}
        getRowId={getRowId}
      />
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={getRowId ? getRowId(row) : i}
                className="hover:bg-muted/50 transition-colors"
              >
                {columns.map((col, j) => (
                  <TableCell key={j}>
                    {col.cell
                      ? col.cell(row)
                      : (row[col.accessorKey as keyof T] as ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { memo, useRef, type ReactNode } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Column } from "./DataTable";

export interface VirtualDataTableProps<T> {
  data: readonly T[];
  columns: readonly Column<T>[];
  getRowId: (row: T) => string;
  rowHeight?: number;
  maxHeight?: number;
}

interface RowProps<T> {
  row: T;
  columns: readonly Column<T>[];
  index: number;
  height: number;
}

function RowInner<T>({ row, columns, index, height }: RowProps<T>) {
  return (
    <TableRow
      aria-rowindex={index + 2}
      style={{ height }}
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
  );
}
const Row = memo(RowInner) as typeof RowInner;

export function VirtualDataTable<T>({
  data,
  columns,
  getRowId,
  rowHeight = 52,
  maxHeight = 640,
}: VirtualDataTableProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
    getItemKey: (i) => getRowId(data[i]),
  });

  const items = virtualizer.getVirtualItems();
  const padTop = items.length ? items[0].start : 0;
  const padBottom = items.length
    ? virtualizer.getTotalSize() - items[items.length - 1].end
    : 0;

  return (
    <div
      ref={scrollRef}
      className="overflow-auto rounded-md border bg-card"
      style={{ maxHeight }}
      role="region"
      aria-label="Scrollable data table"
      tabIndex={0}
    >
      <table
        className="w-full caption-bottom text-sm"
        aria-rowcount={data.length + 1}
      >
        <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_var(--border)]">
          <TableRow aria-rowindex={1}>
            {columns.map((c, i) => (
              <TableHead key={i}>{c.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {padTop > 0 && <tr aria-hidden style={{ height: padTop }} />}
          {items.map((v) => (
            <Row
              key={v.key}
              row={data[v.index]}
              columns={columns}
              index={v.index}
              height={rowHeight}
            />
          ))}
          {padBottom > 0 && <tr aria-hidden style={{ height: padBottom }} />}
        </TableBody>
      </table>
    </div>
  );
}

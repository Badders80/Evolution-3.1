import React from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

/**
 * DataTable Pattern
 *
 * Standardized for race results, listing data, and ownership tables.
 */
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-white/5 bg-neutral-900", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={cn(
                  "p-4 text-label uppercase tracking-wider text-neutral-400 font-medium",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={cn(
                    "p-4 text-body-sm text-neutral-100",
                    col.className
                  )}
                >
                  {typeof col.accessor === 'function'
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

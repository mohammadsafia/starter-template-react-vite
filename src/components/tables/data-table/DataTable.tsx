import { Row, type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import type * as React from 'react';

import { cn, getCommonPinningStyles } from '@utils';
import { Table } from '@components/ui';
import { DataTablePagination } from '@components/tables';
import { Conditional } from '@components/shared';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  isLoading?: boolean;
  getRowClassName?: (row: Row<TData>) => string;
}

export default function DataTable<TData>({ table, actionBar, children, className,getRowClassName, isLoading, ...props }: DataTableProps<TData>) {
  return (
    <div className={cn('flex w-full flex-col gap-2.5 overflow-auto', className)} {...props}>
      {children}
      <div className="border-accent relative overflow-x-auto overflow-y-hidden rounded-md border">
        <Table>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    className='font-bold'
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            <Table.Loader isLoading={isLoading} colSpan={table.getAllColumns().length} rows={10} />

            <Table.Empty colSpan={table.getAllColumns().length} when={!table.getRowModel().rows?.length && !isLoading} />

            <Conditional.If condition={!!table.getRowModel().rows?.length && !isLoading}>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} data-state={row.getIsSelected() && 'selected'}  className={getRowClassName?.(row) ?? ''}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Conditional.If>
          </Table.Body>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && actionBar}
      </div>
    </div>
  );
}

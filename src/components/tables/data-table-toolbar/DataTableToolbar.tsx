import type { Column, Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@utils';
import { Button, Input } from '@components/ui';
import { DataTableDateFilter, DataTableFacetedFilter, DataTableSliderFilter, DataTableViewOptions } from '@components/tables';
import { useDebounce } from '@hooks/shared';
import { useEffect, useState } from 'react';
import { Conditional } from '@components/shared';

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
  placeholder?: string;
  hideViews?: boolean;
}

export default function DataTableToolbar<TData>({
  hideViews,
  placeholder,
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = table.getAllColumns().filter((column) => column.getCanFilter());

  useEffect(() => {
    table.setGlobalFilter(debouncedSearch);
  }, [debouncedSearch, table]);

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
    table.resetGlobalFilter();
    setSearch('');
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn('flex w-full items-start justify-between gap-2 p-1', className)}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Conditional.If condition={!!table?.options?.enableGlobalFilter}>
          <Input
            name="data-table-search"
            placeholder={placeholder ?? 'Search'}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </Conditional.If>
        {columns.map((column) => (
          <DataTableToolbarFilter key={column.id} column={column} />
        ))}
        <Conditional.If condition={isFiltered}>
          <Button aria-label="Reset filters" variant="outline" size="sm" className="h-8 border-dashed" onClick={onReset}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </Conditional.If>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <Conditional.If condition={!hideViews}>
          <DataTableViewOptions table={table} />
        </Conditional.If>
      </div>
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({ column }: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="h-8 w-40 lg:w-56"
            />
          );

        case 'number':
          return (
            <div className="relative">
              <Input
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-8 w-[120px]', columnMeta.unit && 'pr-8')}
              />
              {columnMeta.unit && (
                <span className="bg-accent text-muted-foreground absolute top-0 right-0 bottom-0 flex items-center rounded-r-md px-2 text-sm">
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        case 'range':
          return <DataTableSliderFilter column={column} title={columnMeta.label ?? column.id} />;

        case 'date':
        case 'dateRange':
          return (
            <DataTableDateFilter column={column} title={columnMeta.label ?? column.id} multiple={columnMeta.variant === 'dateRange'} />
          );

        case 'select':
        case 'multiSelect':
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}

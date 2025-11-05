import type { Table } from '@tanstack/react-table';
import { Check, SlidersHorizontal } from 'lucide-react';

import * as React from 'react';
import { Button, Command, Popover } from '@components/ui';
import { cn } from '@utils';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export default function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
    [table],
  );

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button aria-label="Toggle columns" role="combobox" variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          View
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end" className="w-44 p-0">
        <Command>
          <Command.Input placeholder="Search columns..." />
          <Command.List>
            <Command.Empty>No columns found.</Command.Empty>
            <Command.Group>
              {columns.map((column) => (
                <Command.Item key={column.id} onSelect={() => column.toggleVisibility(!column.getIsVisible())}>
                  <span className="truncate">{column.columnDef.meta?.label ?? column.id}</span>
                  <Check className={cn('ml-auto size-4 shrink-0', column.getIsVisible() ? 'opacity-100' : 'opacity-0')} />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
}

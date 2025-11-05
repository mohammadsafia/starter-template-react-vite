import type { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown, EyeOff, X } from 'lucide-react';
import * as React from 'react';
import { DropdownMenu } from '@components/ui';
import { cn } from '@utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.ComponentProps<typeof DropdownMenu.Trigger> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className={cn(
          'hover:bg-accent focus:ring-ring data-[state=open]:bg-accent [&_svg]:text-muted-foreground -ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 focus:ring-1 focus:outline-none [&_svg]:size-4 [&_svg]:shrink-0',
          className,
        )}
        {...props}
      >
        {title}
        {column.getCanSort() &&
          (column.getIsSorted() === 'desc' ? <ChevronDown /> : column.getIsSorted() === 'asc' ? <ChevronUp /> : <ChevronsUpDown />)}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" className="w-28">
        {column.getCanSort() && (
          <>
            <DropdownMenu.CheckboxItem
              className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
              checked={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}
            >
              <ChevronUp />
              Asc
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
              checked={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}
            >
              <ChevronDown />
              Desc
            </DropdownMenu.CheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenu.Item className="[&_svg]:text-muted-foreground pl-2" onClick={() => column.clearSorting()}>
                <X />
                Reset
              </DropdownMenu.Item>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenu.CheckboxItem
            className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff />
            Hide
          </DropdownMenu.CheckboxItem>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

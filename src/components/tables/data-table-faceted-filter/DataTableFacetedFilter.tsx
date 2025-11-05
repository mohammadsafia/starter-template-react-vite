import type { Column } from '@tanstack/react-table';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import * as React from 'react';
import { Option } from '@app-types';
import { Badge, Button, Command, Divider, Popover } from '@components/ui';
import { cn } from '@utils';
import { Conditional } from '@components/shared';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
}

export default function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []);

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      if (!column) return;

      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues],
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />

          {title}

          <Conditional.If condition={selectedValues?.size > 0}>
            <Divider orientation="vertical" className="mx-2 h-4" />

            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
              {selectedValues.size}
            </Badge>

            <div className="hidden space-x-1 lg:flex">
              <Conditional>
                <Conditional.If condition={selectedValues?.size > 2}>
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                </Conditional.If>

                <Conditional.Else>
                  {options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))}
                </Conditional.Else>
              </Conditional>
            </div>
          </Conditional.If>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[12.5rem] p-0" align="start">
        <Command>
          <Command.Input placeholder={title} />

          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <Command.Item key={option.value} onSelect={() => onItemSelect(option, isSelected)}>
                    <div
                      className={cn('border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-full border', {
                        'bg-primary text-primary-foreground': isSelected,
                        'opacity-50 [&_svg]:invisible': !isSelected,
                        'rounded-sm': multiple,
                      })}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && <option.icon />}
                    <span className="flex items-center justify-center truncate text-xs">{option.label}</span>
                    {option.count && <span className="ml-auto text-xs">{option.count}</span>}
                  </Command.Item>
                );
              })}
            </Command.Group>
            {selectedValues.size > 0 && (
              <>
                <Command.Separator />
                <Command.Group>
                  <Command.Item onSelect={() => onReset()} className="justify-center text-center">
                    Clear filters
                  </Command.Item>
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover>
  );
}

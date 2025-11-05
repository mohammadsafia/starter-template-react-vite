import type { ReactNode } from 'react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';

import { Button, Collapsible, Table } from '@components/ui';
import { Conditional, type FacetedColumn, FacetedFilter } from '@components/shared';
import { FormContainer } from '@components/forms';

import { eachWeekOfInterval, endOfWeek, format, isWithinInterval, parseISO } from 'date-fns';

import { XIcon } from 'lucide-react';

type WeekRenderGroupHeader<T> = ({
  rangeLabel,
  weekStart,
  weekEnd,
  entries,
}: {
  rangeLabel: string;
  weekStart: Date;
  weekEnd: Date;
  entries: T[];
}) => ReactNode;

type CustomRenderGroupHeader<T> = ({ groupKey, entries }: { groupKey: string; entries: T[] }) => ReactNode;

type BaseProps<T extends FieldValues> = {
  entries: T[];
  renderRow: (entry: T) => ReactNode;
  isLoading?: boolean;
  emptyState?: ReactNode;
  formContext: UseFormReturn<T | any>;
  filtersColumns?: FacetedColumn[];
};

type WeekGroupedTableProps<T extends FieldValues> = BaseProps<T> & {
  groupByMode: 'week';
  getDate: (entry: T) => string;
  startDate: string;
  endDate: string;
  renderGroupHeader?: WeekRenderGroupHeader<T>;
};

type CustomGroupedTableProps<T extends FieldValues> = BaseProps<T> & {
  groupByMode: 'custom';
  groupBy: (entry: T) => string;
  renderGroupHeader?: CustomRenderGroupHeader<T>;
};

type GroupedTableProps<T extends FieldValues> = WeekGroupedTableProps<T> | CustomGroupedTableProps<T>;

function GroupedTable<T extends FieldValues>(props: GroupedTableProps<T>) {
  const { entries, renderRow, renderGroupHeader, isLoading, emptyState, formContext, filtersColumns } = props;

  const isFiltered = formContext.formState;
  const grouped: Record<string, { entries: T[]; meta?: { weekStart: Date; weekEnd: Date } }> = {};

  if (props.groupByMode === 'week') {
    const { getDate, startDate, endDate } = props;

    const weeks = eachWeekOfInterval(
      {
        start: parseISO(startDate),
        end: parseISO(endDate),
      },
      { weekStartsOn: 0 },
    );

    weeks.forEach((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
      const rangeLabel = `${format(weekStart, 'dd')} – ${format(weekEnd, 'dd MMM yyyy')}`;

      const entriesInWeek = entries.filter((entry) =>
        isWithinInterval(parseISO(getDate(entry)), {
          start: weekStart,
          end: weekEnd,
        }),
      );

      grouped[rangeLabel] = {
        entries: entriesInWeek,
        meta: { weekStart, weekEnd },
      };
    });
  } else {
    entries.forEach((entry) => {
      const key = props.groupBy(entry);
      if (!grouped[key]) grouped[key] = { entries: [] };
      grouped[key].entries.push(entry);
    });
  }

  const groupKeys = Object.keys(grouped);
  const hasAnyEntries = groupKeys.some((key) => grouped[key].entries.length > 0);

  if (!hasAnyEntries && !isLoading) {
    return (
      <div className="mb-2 flex flex-1 flex-col-reverse items-start gap-x-1 gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Table>
          <Table.Empty when message={emptyState} />
        </Table>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <FormContainer formContext={formContext} onSuccess={() => {}}>
        <div className="mb-2 flex flex-1 flex-col-reverse items-start gap-x-1 gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
          {filtersColumns?.map((column) => (
            <FacetedFilter key={`filter-column-${column.name}`} {...column} control={formContext.control} />
          ))}

          <Conditional.If condition={!!isFiltered && !!filtersColumns && filtersColumns?.length > 0}>
            <Button variant="ghost" size="sm" onClick={() => formContext.reset()}>
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          </Conditional.If>
        </div>
      </FormContainer>

      {groupKeys.map((groupKey, idx) => {
        const { entries: groupEntries, meta } = grouped[groupKey];
        const shouldRender = groupEntries.length > 0 || isLoading;
        if (!shouldRender) return null;

        return (
          <Collapsible key={groupKey} defaultOpen={idx === 0}>
            <Collapsible.Trigger className="w-full rounded-md aria-expanded:rounded-t-md aria-expanded:rounded-b-none">
              <Conditional>
                <Conditional.If condition={!!renderGroupHeader}>
                  {props.groupByMode === 'week' && meta
                    ? (props as WeekGroupedTableProps<T>).renderGroupHeader?.({
                        rangeLabel: groupKey,
                        weekStart: meta.weekStart,
                        weekEnd: meta.weekEnd,
                        entries: groupEntries,
                      })
                    : (props as CustomGroupedTableProps<T>).renderGroupHeader?.({ groupKey, entries: groupEntries })}
                </Conditional.If>

                <Conditional.Else>
                  <div className="bg-accent text-accent-foreground flex items-center justify-between px-4 py-2 font-semibold">
                    <span>{groupKey}</span>
                  </div>
                </Conditional.Else>
              </Conditional>
            </Collapsible.Trigger>

            <Collapsible.Content className="border-accent rounded-b-md border-t-0 border-b">
              <Table>
                <Table.Body>
                  <Table.Loader colSpan={4} isLoading={isLoading} rows={3} />
                  <Table.Empty when={!isLoading && !hasAnyEntries} message={emptyState} />
                  {groupEntries.map(renderRow)}
                </Table.Body>
              </Table>
            </Collapsible.Content>
          </Collapsible>
        );
      })}
    </div>
  );
}

export default GroupedTable;

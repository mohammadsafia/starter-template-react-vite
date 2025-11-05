import type { Column } from '@tanstack/react-table';
import * as React from 'react';
import { DATA_TABLE_CONFIG } from '@app-config';
import { ExtendedColumnFilter, FilterOperator, FilterVariant } from '@app-types';

export function getCommonPinningStyles<TData>({
  column,
  withBorder = false,
}: {
  column: Column<TData>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px hsl(var(--border)) inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px hsl(var(--border)) inset'
          : undefined
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<FilterVariant, { label: string; value: FilterOperator }[]> = {
    text: DATA_TABLE_CONFIG.textOperators,
    number: DATA_TABLE_CONFIG.numericOperators,
    range: DATA_TABLE_CONFIG.numericOperators,
    date: DATA_TABLE_CONFIG.dateOperators,
    dateRange: DATA_TABLE_CONFIG.dateOperators,
    boolean: DATA_TABLE_CONFIG.booleanOperators,
    select: DATA_TABLE_CONFIG.selectOperators,
    multiSelect: DATA_TABLE_CONFIG.multiSelectOperators,
  };

  return operatorMap[filterVariant] ?? DATA_TABLE_CONFIG.textOperators;
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant);

  return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq');
}

export function getValidFilters<TData>(filters: ExtendedColumnFilter<TData>[]): ExtendedColumnFilter<TData>[] {
  return filters.filter((filter) =>
    Array.isArray(filter.value) ? filter.value.length > 0 : filter.value !== '' && filter.value !== null && filter.value !== undefined,
  );
}

import '@tanstack/react-table';
import type { ColumnSort, Row, RowData } from '@tanstack/react-table';
import { DataTableConfig } from '@app-config';
import { FilterItemSchema } from '@utils';
import * as React from 'react';

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
}

export interface Option {
  label: string;
  value: string | number;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export type FilterOperator = DataTableConfig['operators'][number];
export type FilterVariant = DataTableConfig['filterVariants'][number];
export type JoinOperator = DataTableConfig['joinOperators'][number];

export interface ExtendedColumnSort<TData extends Record<string, unknown>> extends Omit<ColumnSort, 'id'> {
  id: Extract<keyof TData, string>;
}

export type ExtendedSortingState<TData extends Record<string, unknown>> = ExtendedColumnSort<TData>[];

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>;
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  variant: 'update' | 'delete';
}

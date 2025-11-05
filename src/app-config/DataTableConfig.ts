export type DataTableConfig = typeof DATA_TABLE_CONFIG;

const operators = ['contains', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'startsWith'] as const;

export type ComparisonOperator = (typeof operators)[number];

const joinOperators = ['and', 'or'] as const;

export type LogicalOperator = (typeof operators)[number];
type DataType = 'textOperators' | 'numericOperators' | 'dateOperators' | 'selectOperators' | 'multiSelectOperators' | 'booleanOperators';
type DataOperators = { label: string; value: ComparisonOperator }[];

const dataOperators: Record<DataType, DataOperators> = {
  textOperators: [
    { label: 'Contains', value: 'contains' as const },
    { label: 'Is', value: 'eq' as const },
    { label: 'Is not', value: 'ne' as const },
  ],
  numericOperators: [
    { label: 'Is', value: 'eq' as const },
    { label: 'Is not', value: 'ne' as const },
    { label: 'Is less than', value: 'lt' as const },
    { label: 'Is greater than', value: 'gt' as const },
    { label: 'Is greater than or equal to', value: 'ge' as const },
  ],
  dateOperators: [
    { label: 'Is', value: 'eq' as const },
    { label: 'Is not', value: 'ne' as const },
    { label: 'Is before', value: 'lt' as const },
    { label: 'Is after', value: 'gt' as const },
    { label: 'Is on or before', value: 'le' as const },
    { label: 'Is on or after', value: 'ge' as const },
  ],
  selectOperators: [
    { label: 'Is', value: 'eq' as const },
    { label: 'Is not', value: 'ne' as const },
  ],
  multiSelectOperators: [],
  booleanOperators: [
    { label: 'Is', value: 'eq' as const },
    { label: 'Is not', value: 'ne' as const },
  ],
};

export const DATA_TABLE_CONFIG = {
  ...dataOperators,
  sortOrders: [
    { label: 'Asc', value: 'asc' as const },
    { label: 'Desc', value: 'desc' as const },
  ],
  filterVariants: ['text', 'number', 'range', 'date', 'dateRange', 'boolean', 'select', 'multiSelect'] as const,
  operators,
  joinOperators,
};

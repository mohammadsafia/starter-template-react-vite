import type { ComponentDoc } from './components.data.types';
import { DataTableBasicDemo, DataTableWithFiltersDemo } from './components.data.demos';

export const tableDocs: ComponentDoc[] = [
  {
    id: 'data-table-basic',
    title: 'DataTable (Basic)',
    description: 'Sortable, paginated table using TanStack Table.',
    demo: <DataTableBasicDemo />,
    imports:
      "import { DataTable } from '@components/tables';\nimport { useDataTable } from '@hooks/utils/useDataTable';\nimport { ColumnDef } from '@tanstack/react-table';",
    code: "const columns: ColumnDef<User>[] = [\n  { header: 'Name', accessorKey: 'name' },\n  { header: 'Email', accessorKey: 'email' },\n];\n\nconst { table } = useDataTable({\n  data,\n  columns,\n  pageCount: 1,\n  initialState: { pagination: { pageIndex: 0, pageSize: data.length } },\n  state: { pagination: { pageIndex: 0, pageSize: data.length } },\n});\n\n<DataTable table={table} />",
    tags: ['table', 'data-table', 'basic'],
  },
  {
    id: 'data-table-filters',
    title: 'DataTable with Filters & Search',
    description: 'Full-featured table with toolbar, global search, and column filters.',
    demo: <DataTableWithFiltersDemo />,
    imports:
      "import { DataTable, DataTableToolbar } from '@components/tables';\nimport { useDataTable } from '@hooks/utils/useDataTable';\nimport { ColumnDef } from '@tanstack/react-table';",
    code: "const columns: ColumnDef<User>[] = [\n  { header: 'Name', accessorKey: 'name', enableColumnFilter: true },\n  { header: 'Email', accessorKey: 'email' },\n  { header: 'Role', accessorKey: 'role', enableColumnFilter: true },\n  { header: 'Status', accessorKey: 'status', enableColumnFilter: true },\n];\n\nconst { table } = useDataTable({\n  data,\n  columns,\n  pageCount: Math.ceil(data.length / pageSize),\n  initialState: { pagination: { pageIndex: 0, pageSize: 10 } },\n  state: { pagination: { pageIndex: 0, pageSize: 10 } },\n});\n\n<DataTable table={table}>\n  <DataTableToolbar table={table} />\n</DataTable>",
    tags: ['table', 'data-table', 'filters', 'search', 'toolbar'],
  },
];


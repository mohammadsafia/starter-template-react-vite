import { type ComponentPropsWithoutRef, type FC, type ReactNode } from 'react';
import { Skeleton } from '@components/ui';
import { Loader } from '@components/shared';

import { cn } from '@utils';

import { Database } from 'lucide-react';

type TableProps = ComponentPropsWithoutRef<'table'> & {
  isLoading?: boolean;
};

type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;
type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;
type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;
type TableRowProps = ComponentPropsWithoutRef<'tr'>;
type TableHeadProps = ComponentPropsWithoutRef<'th'>;
type TableCellProps = ComponentPropsWithoutRef<'td'>;
type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;
type TableEmptyProps = ComponentPropsWithoutRef<'tr'> & { colSpan?: number; message?: ReactNode; when: boolean };
type TableLoaderProps = {
  colSpan: number;
  rows?: number;
  isLoading?: boolean;
  loaderType?: 'skeleton' | 'spinner';
};

type TableComponents = FC<TableProps> & {
  Header: FC<TableHeaderProps>;
  Body: FC<TableBodyProps>;
  Footer: FC<TableFooterProps>;
  Row: FC<TableRowProps>;
  Head: FC<TableHeadProps>;
  Cell: FC<TableCellProps>;
  Caption: FC<TableCaptionProps>;
  Empty: FC<TableEmptyProps>;
  Loader: FC<TableLoaderProps>;
};

const Header = ({ className, ...props }: TableHeaderProps) => (
  <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />
);

const Body = ({ className, ...props }: TableBodyProps) => (
  <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

const Footer = ({ className, ...props }: TableFooterProps) => (
  <tfoot data-slot="table-footer" className={cn('bg-primary text-primary-foreground font-medium', className)} {...props} />
);

const Row = ({ className, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    className={cn('hover:bg-accent/20 border-b-accent data-[state=selected]:bg-accent border-b transition-colors', className)}
    {...props}
  />
);

const Head = ({ className, ...props }: TableHeadProps) => (
  <th
    data-slot="table-head"
    className={cn('bg-accent/20 text-primary-300 h-12 px-4 text-start align-middle font-medium [&:has([role=checkbox])]:pe-0', className)}
    {...props}
  />
);

const Cell = ({ className, ...props }: TableCellProps) => (
  <td data-slot="table-cell" className={cn('p-4 align-middle [&:has([role=checkbox])]:pe-0', className)} {...props} />
);

const Caption = ({ className, ...props }: TableCaptionProps) => (
  <caption data-slot="table-caption" className={cn('text-primary mt-4 text-sm', className)} {...props} />
);

const Empty = ({ className, colSpan = 1, message = 'No Data', when, ...props }: TableEmptyProps) => {
  if (!when) return null;

  return (
    <tr data-slot="table-empty" className={cn('h-96 hover:bg-transparent', className)} {...props}>
      <td colSpan={colSpan} className="text-center">
        <Database size={50} className="mx-auto block" />

        <span className="mt-2 block text-2xl">{message}</span>
      </td>
    </tr>
  );
};

const TableLoader = ({ colSpan, loaderType = 'skeleton', isLoading = false, rows = 10 }: TableLoaderProps) => {
  if (!isLoading) return null;

  if (loaderType === 'spinner') return <Loader data-slot="table-loader" displayLogo={false} withOverlay={false} />;

  return (
    <>
      {Array.from({ length: rows }, (_, idx) => (
        <Row key={`skeleton-row-${idx}`} data-slot="table-loader">
          {Array.from({ length: colSpan }, (_, colIndex) => (
            <Cell key={`skeleton-cell-${idx}-${colIndex}`}>
              <Skeleton />
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
};

const Table: TableComponents = ({ className, ...props }) => (
  <table data-slot="table" className={cn('w-full caption-bottom overflow-x-auto text-sm max-sm:block max-sm:pb-3', className)} {...props} />
);

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
Table.Caption = Caption;
Table.Empty = Empty;
Table.Loader = TableLoader;

export default Table;

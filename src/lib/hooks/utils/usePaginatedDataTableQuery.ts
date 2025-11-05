import { ExtendedSortingState, ResultDto } from '@app-types';
import { QueryKey } from '@tanstack/query-core';
import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ColumnFiltersState, OnChangeFn, PaginationState, Updater } from '@tanstack/react-table';
import { AxiosRequestConfig } from 'axios';
import { Options, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useState } from 'react';

export type PaginatedDataTable<T extends Record<string, unknown>> = ResultDto<T>;
export type UsePaginatedDataTableQueryProps<
  T extends Record<string, unknown>,
  TError = unknown,
  TData = T,
  TQueryKey extends QueryKey = QueryKey,
> = {
  queryFn: (params: AxiosRequestConfig['params']) => Promise<PaginatedDataTable<T>>;
  queryKey: string[];
  params?: AxiosRequestConfig['params'];
  queryOptions?: Omit<UseQueryOptions<T, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
  };
  enabled?: boolean;
} & Partial<typeof DEFAULTS>;

// Liferay default
const DEFAULTS = {
  pageKey: 'page',
  perPageKey: 'pageSize',
  globalFilterKey: 'search',
  sortKey: 'sort',
  filterKey: 'filter',
  defaultFirstPage: 1,
  defaultPageSize: 10,
  sortToParam: <T extends Record<string, any>>(sortState: ExtendedSortingState<T>) =>
    sortState.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(','),
  filtersToParam: (state: ColumnFiltersState) => state.map(({ id, value }) => `${id} eq ${value}`).join(' and '),
} as const;

const queryStateOptions: Options = {
  history: 'replace',
};

export function usePaginatedDataTableQuery<T extends Record<string, any>>(props: UsePaginatedDataTableQueryProps<T>) {
  const {
    params,
    queryKey,
    queryFn,
    pageKey,
    sortKey,
    sortToParam,
    defaultFirstPage,
    defaultPageSize,
    globalFilterKey,
    perPageKey,
    filtersToParam,
    filterKey,
    enabled = true,
  } = props;

  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULTS.defaultFirstPage),
    perPage: parseAsInteger.withOptions(queryStateOptions).withDefault(defaultPageSize ?? DEFAULTS.defaultPageSize),
    globalFilter: parseAsString.withOptions(queryStateOptions).withDefault(''),
  });

  const [sorting, setSorting] = useState<ExtendedSortingState<T>>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const dataTableQuery = useQuery<PaginatedDataTable<T>, Error>({
    queryKey: [...queryKey, query.page, query.perPage, query.globalFilter, sorting, columnFilters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(params);
      let pageNumber = query.page;

      if (query.globalFilter && query.globalFilter.length) {
        queryParams.append(globalFilterKey ?? DEFAULTS.globalFilterKey, query.globalFilter);
      }

      if (query.globalFilter.length > 0 && columnFilters.length > 0) {
        // Reset page number to 1 when column filter or global filter is applied
        pageNumber = defaultFirstPage ?? DEFAULTS.defaultFirstPage;
        await setQuery((prev) => {
          return {
            ...prev,
            page: pageNumber,
          };
        });
      }

      // TODO: Check with Safia
      if (!columnFilters.length) {
        filtersToParam?.(columnFilters);
      }

      if (columnFilters.length) {
        queryParams.append(filterKey ?? DEFAULTS.filterKey, (filtersToParam ?? DEFAULTS.filtersToParam)(columnFilters));
      }

      if (sorting.length > 0) {
        queryParams.append(sortKey ?? DEFAULTS.sortKey, (sortToParam ?? DEFAULTS.sortToParam)(sorting));
      }

      queryParams.append(pageKey ?? DEFAULTS.pageKey, pageNumber.toString());
      queryParams.append(perPageKey ?? DEFAULTS.perPageKey, query.perPage.toString());

      return await queryFn(queryParams.toString());
    },
    placeholderData: keepPreviousData,
    enabled,
  });

  const setPagination: OnChangeFn<PaginationState> = async (updater) => {
    if (typeof updater === 'function') {
      const newState = updater({ pageIndex: query.page, pageSize: query.perPage });
      await setQuery({
        page: newState.pageIndex,
      });
      await setQuery({
        perPage: newState.pageSize,
      });
    } else {
      await setQuery({
        page: updater.pageIndex,
      });
      await setQuery({
        perPage: updater.pageSize,
      });
    }
  };

  return {
    ...dataTableQuery,
    data: (dataTableQuery.data?.items ?? []) as T[],
    rowCount: dataTableQuery.data?.totalCount ?? 0,
    totalPages: dataTableQuery.data?.lastPage ?? 0,
    pagination: { pageIndex: query.page - 1, pageSize: query.perPage },
    setPagination,
    globalFilter: query.globalFilter,
    setGlobalFilter: (value: string) => setQuery({ globalFilter: value }),
    setSorting: setSorting as Updater<ExtendedSortingState<T>>,
    sorting,
    columnFilters,
    setColumnFilters,
  };
}

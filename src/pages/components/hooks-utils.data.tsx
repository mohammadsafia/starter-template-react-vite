import type { ReactNode } from 'react';
import { Card } from '@components/ui';

export type HookUtilDoc = {
  id: string;
  title: string;
  description: string;
  category: 'hook' | 'utility';
  benefits: string[];
  usage: ReactNode;
  examples: { title: string; code: string }[];
  parameters?: { name: string; type: string; description: string }[];
  returns?: { name: string; type: string; description: string }[];
};

export const hooksUtilsDocs: HookUtilDoc[] = [
  // ==================== HOOKS ====================
  {
    id: 'use-data-table',
    title: 'useDataTable',
    description: 'A powerful hook for managing data tables with URL-synced state, pagination, sorting, filtering, and row selection.',
    category: 'hook',
    benefits: [
      'URL-synced pagination, sorting, and filtering - shareable URLs',
      'Built-in debouncing and throttling for better performance',
      'Full TypeScript support with type-safe column definitions',
      'Automatic state persistence in URL query parameters',
      'Server-side pagination, sorting, and filtering support',
      'Row selection and column visibility management',
      'Faceted filtering with min/max values',
    ],
    parameters: [
      { name: 'columns', type: 'ColumnDef<TData>[]', description: 'Table column definitions' },
      { name: 'pageCount', type: 'number', description: 'Total number of pages (required for server-side pagination)' },
      { name: 'data', type: 'TData[]', description: 'Table data array' },
      { name: 'initialState', type: 'Partial<TableState>', description: 'Initial table state (pagination, sorting, etc.)' },
      { name: 'history', type: '"push" | "replace"', description: 'Browser history mode (default: "replace")' },
      { name: 'debounceMs', type: 'number', description: 'Debounce delay for URL updates (default: 300ms)' },
      { name: 'throttleMs', type: 'number', description: 'Throttle delay for URL updates (default: 50ms)' },
    ],
    returns: [
      { name: 'table', type: 'Table<TData>', description: 'TanStack Table instance with all methods' },
      { name: 'shallow', type: 'boolean', description: 'Whether URL updates are shallow' },
      { name: 'debounceMs', type: 'number', description: 'Current debounce milliseconds' },
      { name: 'throttleMs', type: 'number', description: 'Current throttle milliseconds' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useDataTable } from '@hooks/utils';

const MyTable = () => {
  const { table } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: Math.ceil(totalUsers / pageSize),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'name', desc: false }],
    },
  });

  return <DataTable table={table} />;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Usage',
        code: `const { table } = useDataTable({
  data: mockUsers,
  columns: columns,
  pageCount: 10,
});`,
      },
      {
        title: 'With Custom Debouncing',
        code: `const { table } = useDataTable({
  data: users,
  columns: columns,
  pageCount: totalPages,
  debounceMs: 500, // Wait 500ms before updating URL
  throttleMs: 100,  // Max one update per 100ms
});`,
      },
      {
        title: 'With Initial State',
        code: `const { table } = useDataTable({
  data: products,
  columns: productColumns,
  pageCount: Math.ceil(total / 20),
  initialState: {
    pagination: { pageIndex: 0, pageSize: 20 },
    sorting: [{ id: 'createdAt', desc: true }],
    columnVisibility: { internalId: false },
  },
});`,
      },
    ],
  },
  {
    id: 'use-is-fetching-query',
    title: 'useIsFetchingQuery',
    description: 'Check if a specific React Query is currently fetching data. Useful for showing loading states for specific queries.',
    category: 'hook',
    benefits: [
      'Targeted loading states for specific queries',
      'Avoids global loading indicators',
      'Perfect for multiple simultaneous queries',
      'Simple boolean return value',
      'Works with React Query query keys',
    ],
    parameters: [{ name: 'queryKey', type: 'string', description: 'The query key to check for fetching status' }],
    returns: [{ name: 'isLoading', type: 'boolean', description: 'True if the query is currently fetching' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useIsFetchingQuery } from '@hooks/utils';

const UserProfile = () => {
  const { isLoading } = useIsFetchingQuery('users');

  return (
    <div>
      {isLoading && <Loader />}
      <UserData />
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Single Query Loading',
        code: `const { isLoading } = useIsFetchingQuery('users');

if (isLoading) {
  return <Skeleton />;
}`,
      },
      {
        title: 'Multiple Query States',
        code: `const { isLoading: isLoadingUsers } = useIsFetchingQuery('users');
const { isLoading: isLoadingPosts } = useIsFetchingQuery('posts');

return (
  <>
    {isLoadingUsers && <Badge>Loading Users...</Badge>}
    {isLoadingPosts && <Badge>Loading Posts...</Badge>}
  </>
);`,
      },
    ],
  },
  {
    id: 'use-is-loading-mutation',
    title: 'useIsLoadingMutation',
    description:
      'Check if a specific React Query mutation is currently in progress. Ideal for showing loading states on buttons and forms.',
    category: 'hook',
    benefits: [
      'Button-specific loading states',
      'Prevents duplicate submissions',
      'Better UX with targeted feedback',
      'Works with React Query mutations',
      'Simple boolean return value',
    ],
    parameters: [{ name: 'mutationKey', type: 'string', description: 'The mutation key to check for loading status' }],
    returns: [{ name: 'isLoading', type: 'boolean', description: 'True if the mutation is currently executing' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useIsLoadingMutation } from '@hooks/utils';

const CreateUserButton = () => {
  const { isLoading } = useIsLoadingMutation('createUser');
  const createMutation = useMutation({ mutationKey: ['createUser'] });

  return (
    <LoadingButton
      loading={isLoading}
      onClick={() => createMutation.mutate(userData)}
    >
      Create User
    </LoadingButton>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Form Submission',
        code: `const { isLoading } = useIsLoadingMutation('updateProfile');

return (
  <form onSubmit={handleSubmit}>
    <Button type="submit" disabled={isLoading}>
      {isLoading ? 'Saving...' : 'Save Profile'}
    </Button>
  </form>
);`,
      },
      {
        title: 'Multiple Mutations',
        code: `const { isLoading: isCreating } = useIsLoadingMutation('create');
const { isLoading: isDeleting } = useIsLoadingMutation('delete');

const isAnyLoading = isCreating || isDeleting;`,
      },
    ],
  },
  {
    id: 'use-paginated-data-table-query',
    title: 'usePaginatedDataTableQuery',
    description:
      'All-in-one hook for server-side paginated data tables. Handles pagination, sorting, filtering, and global search with URL sync.',
    category: 'hook',
    benefits: [
      'Complete server-side table solution',
      'URL-synced state for all table parameters',
      'Automatic query parameter construction',
      'Built-in global search and column filtering',
      'Liferay DXP compatible by default',
      'Keeps previous data during navigation (smooth UX)',
      'TypeScript type safety for data and params',
    ],
    parameters: [
      { name: 'queryFn', type: '(params) => Promise<ResultDto<T>>', description: 'Function to fetch paginated data' },
      { name: 'queryKey', type: 'string[]', description: 'React Query cache key' },
      { name: 'params', type: 'Record<string, any>', description: 'Additional query parameters' },
      { name: 'defaultPageSize', type: 'number', description: 'Default page size (default: 10)' },
      { name: 'enabled', type: 'boolean', description: 'Whether query is enabled (default: true)' },
    ],
    returns: [
      { name: 'data', type: 'T[]', description: 'Array of table data items' },
      { name: 'rowCount', type: 'number', description: 'Total number of rows' },
      { name: 'totalPages', type: 'number', description: 'Total number of pages' },
      { name: 'pagination', type: 'PaginationState', description: 'Current pagination state' },
      { name: 'setPagination', type: 'OnChangeFn', description: 'Function to update pagination' },
      { name: 'globalFilter', type: 'string', description: 'Current global filter value' },
      { name: 'setGlobalFilter', type: '(value: string) => void', description: 'Function to update global filter' },
      { name: 'sorting', type: 'SortingState', description: 'Current sorting state' },
      { name: 'setSorting', type: 'OnChangeFn', description: 'Function to update sorting' },
      { name: 'columnFilters', type: 'ColumnFiltersState', description: 'Current column filters' },
      { name: 'setColumnFilters', type: 'OnChangeFn', description: 'Function to update column filters' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { usePaginatedDataTableQuery } from '@hooks/utils';

const UsersTable = () => {
  const {
    data,
    rowCount,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    sorting,
    setSorting,
    isLoading,
  } = usePaginatedDataTableQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    defaultPageSize: 20,
  });

  return (
    <DataTable
      data={data}
      rowCount={rowCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
    />
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Paginated Table',
        code: `const { data, rowCount, isLoading } = usePaginatedDataTableQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});`,
      },
      {
        title: 'With Custom Parameters',
        code: `const { data, pagination, setPagination } = usePaginatedDataTableQuery({
  queryKey: ['orders', status],
  queryFn: fetchOrders,
  params: { status: 'active' },
  defaultPageSize: 25,
});`,
      },
      {
        title: 'With All Features',
        code: `const table = usePaginatedDataTableQuery({
  queryKey: ['users'],
  queryFn: api.users.getAll,
  defaultPageSize: 50,
  pageKey: 'page',
  sortKey: 'sort',
  globalFilterKey: 'search',
  enabled: isAuthenticated,
});`,
      },
    ],
  },
  {
    id: 'use-route-utils',
    title: 'useRouteUtils',
    description: 'Utility hook for checking active routes and sub-routes. Perfect for highlighting active navigation links.',
    category: 'hook',
    benefits: [
      'Easy active link detection',
      'Supports nested routes',
      'Sub-route checking for parent links',
      'Works with React Router',
      'Clean API with two simple functions',
    ],
    returns: [
      { name: 'isActiveLink', type: '(path: string) => boolean', description: 'Check if exact path is active' },
      { name: 'isActiveSubLink', type: '(path: string) => boolean', description: 'Check if path or sub-path is active' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useRouteUtils } from '@hooks/utils';

const NavLink = ({ path, children }) => {
  const { isActiveLink } = useRouteUtils();
  const active = isActiveLink(path);

  return (
    <a
      href={path}
      className={cn(
        'nav-link',
        active && 'active'
      )}
    >
      {children}
    </a>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Active Link Highlighting',
        code: `const { isActiveLink } = useRouteUtils();

<Link
  to="/users"
  className={isActiveLink('/users') ? 'text-primary' : 'text-muted'}
>
  Users
</Link>`,
      },
      {
        title: 'Parent Route Highlighting',
        code: `const { isActiveSubLink } = useRouteUtils();

// Highlights /users even when on /users/123
<Link
  to="/users"
  className={isActiveSubLink('/users') ? 'font-bold' : ''}
>
  Users
</Link>`,
      },
      {
        title: 'Sidebar Navigation',
        code: `const { isActiveLink, isActiveSubLink } = useRouteUtils();

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
];

return menuItems.map(item => (
  <NavItem
    key={item.path}
    active={isActiveLink(item.path)}
    expanded={isActiveSubLink(item.path)}
  />
));`,
      },
    ],
  },
  {
    id: 'use-debounce',
    title: 'useDebounce',
    description:
      'Delays updating a value until a specified time period has elapsed without changes. Perfect for search inputs and expensive operations.',
    category: 'hook',
    benefits: [
      'Reduces unnecessary renders and API calls',
      'Improves performance for expensive operations',
      'Simple API with automatic cleanup',
      'Configurable delay period',
      'Perfect for search inputs and live validation',
    ],
    parameters: [
      { name: 'value', type: 'T', description: 'The value to debounce' },
      { name: 'delay', type: 'number', description: 'Delay in milliseconds (default: 500ms)' },
    ],
    returns: [{ name: 'debouncedValue', type: 'T', description: 'The debounced value' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useDebounce } from '@hooks/shared';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // Only runs 500ms after user stops typing
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Search Input',
        code: `const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery) {
    searchAPI(debouncedQuery);
  }
}, [debouncedQuery]);`,
      },
      {
        title: 'Window Resize Handler',
        code: `const [windowSize, setWindowSize] = useState(window.innerWidth);
const debouncedSize = useDebounce(windowSize, 200);

useEffect(() => {
  const handleResize = () => setWindowSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`,
      },
    ],
  },
  {
    id: 'use-debounced-callback',
    title: 'useDebouncedCallback',
    description: 'Creates a debounced version of a callback function that delays execution until after a specified period of inactivity.',
    category: 'hook',
    benefits: [
      'Prevents rapid repeated function calls',
      'Stable callback reference with useCallbackRef',
      'Automatic cleanup on unmount',
      'Perfect for event handlers and user input',
      'Reduces server load and API calls',
    ],
    parameters: [
      { name: 'callback', type: 'T extends (...args) => unknown', description: 'Function to debounce' },
      { name: 'delay', type: 'number', description: 'Delay in milliseconds before execution' },
    ],
    returns: [{ name: 'debouncedCallback', type: '(...args: Parameters<T>) => void', description: 'Debounced version of the callback' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useDebouncedCallback } from '@hooks/shared';

const AutoSaveForm = () => {
  const saveData = useDebouncedCallback(
    (formData) => {
      api.save(formData);
    },
    1000
  );

  return (
    <Form onChange={(data) => saveData(data)}>
      {/* Form fields */}
    </Form>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Auto-Save Input',
        code: `const debouncedSave = useDebouncedCallback(
  (value) => api.updateField(value),
  500
);

<Input onChange={(e) => debouncedSave(e.target.value)} />`,
      },
      {
        title: 'Window Resize Handler',
        code: `const handleResize = useDebouncedCallback(() => {
  updateLayout(window.innerWidth);
}, 250);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);`,
      },
    ],
  },
  {
    id: 'use-toast',
    title: 'useToast',
    description: 'Provides a centralized toast notification system with automatic dismissal, persistent toasts, and action support.',
    category: 'hook',
    benefits: [
      'Centralized notification management',
      'Automatic dismissal with configurable timeout',
      'Persistent toast support',
      'Update and dismiss individual toasts',
      'Limit concurrent toasts to prevent spam',
      'Action buttons and custom content',
    ],
    parameters: [],
    returns: [
      { name: 'toasts', type: 'ToasterToast[]', description: 'Array of active toasts' },
      { name: 'toast', type: '(props: Toast) => { id, dismiss, update }', description: 'Function to show a toast' },
      { name: 'dismiss', type: '(toastId?: string) => void', description: 'Function to dismiss toast(s)' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useToast } from '@hooks/shared';

const MyComponent = () => {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
      variant: 'default',
    });
  };

  const handleError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong.',
      variant: 'destructive',
    });
  };

  return <Button onClick={handleSuccess}>Save</Button>;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Success Toast',
        code: `const { toast } = useToast();

toast({
  title: 'Changes saved',
  description: 'Your profile has been updated.',
});`,
      },
      {
        title: 'Persistent Toast with Action',
        code: `const { toast } = useToast();

const toastInstance = toast({
  title: 'Update available',
  description: 'A new version is ready.',
  persistent: true,
  action: <Button onClick={() => window.location.reload()}>Refresh</Button>,
});

// Dismiss later
toastInstance.dismiss();`,
      },
    ],
  },
  {
    id: 'use-infinite-scroll',
    title: 'useInfiniteScroll',
    description: 'Provides a ref callback for implementing infinite scroll pagination using Intersection Observer API.',
    category: 'hook',
    benefits: [
      'Easy infinite scroll implementation',
      'Uses performant Intersection Observer',
      'Automatic observer cleanup',
      'Prevents duplicate loads during fetching',
      'Respects hasMore and isLoading states',
      'Works with any scrollable container',
    ],
    parameters: [
      { name: 'onLoadMore', type: '() => void', description: 'Callback to load more items' },
      { name: 'hasMore', type: 'boolean', description: 'Whether more items are available' },
      { name: 'isLoading', type: 'boolean', description: 'Whether items are currently loading' },
    ],
    returns: [{ name: 'ref', type: '(node: HTMLDivElement | null) => void', description: 'Ref callback to attach to sentinel element' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useInfiniteScroll } from '@hooks/shared';

const InfiniteList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    const newItems = await fetchItems();
    setItems([...items, ...newItems]);
    setHasMore(newItems.length > 0);
    setIsLoading(false);
  };

  const sentinelRef = useInfiniteScroll({ onLoadMore: loadMore, hasMore, isLoading });

  return (
    <div>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={sentinelRef}>{isLoading && <Loader />}</div>
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Infinite Scroll',
        code: `const sentinelRef = useInfiniteScroll({
  onLoadMore: () => fetchNextPage(),
  hasMore: hasNextPage,
  isLoading: isFetching,
});

return (
  <div>
    {data.map(item => <Card key={item.id}>{item.name}</Card>)}
    <div ref={sentinelRef} />
  </div>
);`,
      },
      {
        title: 'With Loading Indicator',
        code: `const ref = useInfiniteScroll({
  onLoadMore: loadMoreUsers,
  hasMore: !isLastPage,
  isLoading,
});

return (
  <>
    {users.map(user => <UserCard key={user.id} user={user} />)}
    <div ref={ref} className="py-4">
      {isLoading && <Skeleton />}
      {!hasMore && <p>No more users</p>}
    </div>
  </>
);`,
      },
    ],
  },
  {
    id: 'use-media-query',
    title: 'useMediaQuery',
    description:
      'Tracks window width and provides boolean flags for responsive breakpoint matching (up/down). Includes manual recalculation trigger.',
    category: 'hook',
    benefits: [
      'Real-time responsive breakpoint detection',
      'Predefined breakpoints (XS to 3XL)',
      'matchUp and matchDown for each breakpoint',
      'Manual recalculation support',
      'Automatic cleanup of event listeners',
      'Type-safe breakpoint checks',
    ],
    parameters: [],
    returns: [
      { name: 'matchDownXS', type: 'boolean', description: 'True if width < 480px' },
      { name: 'matchUpXS', type: 'boolean', description: 'True if width > 480px' },
      { name: 'matchDownSM', type: 'boolean', description: 'True if width < 640px' },
      { name: 'matchUpSM', type: 'boolean', description: 'True if width > 640px' },
      { name: 'matchDownMD', type: 'boolean', description: 'True if width < 1024px' },
      { name: 'matchUpMD', type: 'boolean', description: 'True if width > 1024px' },
      { name: 'recalc', type: '() => void', description: 'Manually trigger recalculation' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useMediaQuery } from '@hooks/shared';

const ResponsiveComponent = () => {
  const { matchDownMD, matchUpLG } = useMediaQuery();

  return (
    <div>
      {matchDownMD && <MobileNav />}
      {matchUpLG && <DesktopNav />}
      <Content />
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Conditional Rendering',
        code: `const { matchDownMD, matchUpMD } = useMediaQuery();

return (
  <>
    {matchDownMD && <MobileLayout />}
    {matchUpMD && <DesktopLayout />}
  </>
);`,
      },
      {
        title: 'Dynamic Grid Columns',
        code: `const { matchUpSM, matchUpLG } = useMediaQuery();

const columns = matchUpLG ? 4 : matchUpSM ? 2 : 1;

return <Grid columns={columns}>{items}</Grid>;`,
      },
    ],
  },
  {
    id: 'use-page-visibility',
    title: 'usePageVisibility',
    description:
      'Detects when the browser tab becomes visible or hidden using the Page Visibility API. Useful for pausing/resuming activities.',
    category: 'hook',
    benefits: [
      'Detect tab visibility changes',
      'Pause expensive operations when tab is hidden',
      'Resume activity when user returns',
      'Battery and performance optimization',
      'Automatic event listener cleanup',
      'Simple boolean state',
    ],
    parameters: [],
    returns: [{ name: 'isTabActive', type: 'boolean', description: 'True when the tab is visible' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { usePageVisibility } from '@hooks/shared';

const LiveDashboard = () => {
  const { isTabActive } = usePageVisibility();

  useEffect(() => {
    if (!isTabActive) {
      pausePolling();
    } else {
      resumePolling();
    }
  }, [isTabActive]);

  return <Dashboard />;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Pause Video Playback',
        code: `const { isTabActive } = usePageVisibility();

useEffect(() => {
  if (!isTabActive) {
    videoRef.current?.pause();
  }
}, [isTabActive]);`,
      },
      {
        title: 'Stop Polling When Hidden',
        code: `const { isTabActive } = usePageVisibility();

const { refetch } = useQuery({
  queryKey: ['data'],
  refetchInterval: isTabActive ? 5000 : false,
});`,
      },
    ],
  },
  {
    id: 'use-clipboard',
    title: 'useClipboard',
    description: 'Provides copy-to-clipboard functionality with status tracking, auto-reset, and success/error callbacks.',
    category: 'hook',
    benefits: [
      'Simple clipboard API with status tracking',
      'Auto-reset copied state after timeout',
      'Success and error callback support',
      'Automatic cleanup on unmount',
      'Perfect for copy buttons',
      'Configurable timeout duration',
    ],
    parameters: [
      { name: 'options.timeout', type: 'number', description: 'Auto-reset duration in ms (default: 2000)' },
      { name: 'options.onSuccess', type: '() => void', description: 'Success callback' },
      { name: 'options.onError', type: '(error: unknown) => void', description: 'Error callback' },
    ],
    returns: [
      { name: 'copied', type: 'boolean', description: 'True if recently copied' },
      { name: 'copy', type: '(text: string) => Promise<void>', description: 'Function to copy text' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useClipboard } from '@hooks/shared';

const CopyButton = ({ text }) => {
  const { copied, copy } = useClipboard({
    timeout: 3000,
    onSuccess: () => toast({ title: 'Copied!' }),
  });

  return (
    <Button onClick={() => copy(text)}>
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Copy Code Block',
        code: `const { copied, copy } = useClipboard();

<Button onClick={() => copy(codeSnippet)}>
  {copied ? <Check /> : <Copy />}
</Button>`,
      },
      {
        title: 'Copy with Toast',
        code: `const { copy } = useClipboard({
  onSuccess: () => toast({ title: 'Link copied to clipboard' }),
  onError: () => toast({ title: 'Failed to copy', variant: 'destructive' }),
});

<Button onClick={() => copy(shareUrl)}>Share Link</Button>`,
      },
    ],
  },
  {
    id: 'use-date',
    title: 'useDate',
    description:
      'Comprehensive date manipulation and formatting utilities built on Day.js with support for multiple formats, timezones, and durations.',
    category: 'hook',
    benefits: [
      'Extensive date formatting options',
      'Timezone conversion (UTC/local)',
      'Date arithmetic (add, subtract, difference)',
      'Duration parsing and formatting',
      'Date range generation',
      'Date validation and comparison',
      'Predefined format constants',
    ],
    parameters: [],
    returns: [
      { name: 'formatDate', type: '(input: DateInput, format: DateFormat) => string', description: 'Format date with given format' },
      { name: 'addDuration', type: '(input: DateInput, amount: number, unit: UnitOfTime) => string', description: 'Add duration to date' },
      {
        name: 'getDifference',
        type: '(start: DateInput, end: DateInput, unit?: UnitOfTime) => number',
        description: 'Get difference between dates',
      },
      { name: 'isBefore', type: '(date: DateInput, comparison: DateInput) => boolean', description: 'Check if date is before another' },
      { name: 'isAfter', type: '(date: DateInput, comparison: DateInput) => boolean', description: 'Check if date is after another' },
      { name: 'constants', type: 'object', description: 'DATE_FORMATS, TIME_FORMATS, UnitOfTime constants' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useDate } from '@hooks/shared';

const DateDisplay = () => {
  const { formatDate, getDifference, constants } = useDate();
  
  const formatted = formatDate(
    new Date(),
    constants.DateFormats.SHORT_MONTH_DAY_YEAR
  );
  // "Dec 22, 2024"
  
  const daysDiff = getDifference('2024-01-01', '2024-12-31', 'day');
  // 365

  return <p>{formatted}</p>;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Format Multiple Dates',
        code: `const { formatDate, constants } = useDate();

const display = formatDate(
  new Date(),
  constants.DateFormats.FULL_MONTH_DAY_YEAR
);
// "December 22, 2024"`,
      },
      {
        title: 'Date Arithmetic',
        code: `const { addDuration, subtractDuration } = useDate();

const tomorrow = addDuration(new Date(), 1, 'day');
const lastWeek = subtractDuration(new Date(), 7, 'day');`,
      },
    ],
  },
  {
    id: 'use-time',
    title: 'useTime',
    description:
      'Utilities for parsing, formatting, and manipulating time strings with support for 12/24-hour formats and time calculations.',
    category: 'hook',
    benefits: [
      'Parse time strings in multiple formats',
      'Convert between 12-hour and 24-hour formats',
      'Convert minutes to/from time strings',
      'Generate time slot options',
      'Add/subtract time durations',
      'Convert Date objects to time strings',
    ],
    parameters: [],
    returns: [
      {
        name: 'parseTimeString',
        type: '(val: string) => [number, number, string]',
        description: 'Parse time string to [hours, minutes, am/pm]',
      },
      { name: 'minsToTimeString', type: '(mins: number, ampm?: boolean) => string', description: 'Convert minutes to time string' },
      { name: 'timeStringToMins', type: '(timeStr: string) => number', description: 'Convert time string to total minutes' },
      {
        name: 'getTimeOptions',
        type: '(start: string, end: string, step: number, ampm?: boolean) => string[]',
        description: 'Generate time slot array',
      },
      { name: 'dateToTimeString', type: '(date: Date, ampm?: boolean) => string', description: 'Extract time from Date' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useTime } from '@hooks/shared';

const TimePicker = () => {
  const { getTimeOptions, minsToTimeString } = useTime();
  
  const options = getTimeOptions('09:00 AM', '05:00 PM', 30);
  // ['09:00 AM', '09:30 AM', '10:00 AM', ...]
  
  const timeStr = minsToTimeString(750, true);
  // "12:30 PM"

  return (
    <select>
      {options.map(time => <option key={time}>{time}</option>)}
    </select>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Time Slot Picker',
        code: `const { getTimeOptions } = useTime();

const slots = getTimeOptions('08:00', '17:00', 60, true);
// ['08:00 AM', '09:00 AM', ..., '04:00 PM']`,
      },
      {
        title: 'Minutes Conversion',
        code: `const { timeStringToMins, minsToTimeString } = useTime();

const minutes = timeStringToMins('02:30 PM'); // 870
const timeStr = minsToTimeString(870, true); // '02:30 PM'`,
      },
    ],
  },
  {
    id: 'use-storage',
    title: 'useStorage',
    description:
      'Type-safe localStorage hook with automatic JSON serialization, default values, and memoization for persistent state management.',
    category: 'hook',
    benefits: [
      'Type-safe localStorage access',
      'Automatic JSON serialization/deserialization',
      'Default value support',
      'Memoized retrieval for performance',
      'Stable setter function',
      'Error handling built-in',
    ],
    parameters: [
      { name: 'storageKey', type: 'string', description: 'localStorage key' },
      { name: 'defaultValue', type: 'TDefault', description: 'Default value if key not found (default: null)' },
    ],
    returns: [
      { name: 'value', type: 'TData | TDefault', description: 'Retrieved value or default' },
      { name: 'setValue', type: '(value: TData) => void', description: 'Function to update stored value' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useStorage } from '@hooks/shared';

const UserPreferences = () => {
  const [theme, setTheme] = useStorage<string>('theme', 'light');
  const [settings, setSettings] = useStorage<Settings>(
    'user-settings',
    { notifications: true }
  );

  return (
    <div>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme ({theme})
      </Button>
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Store User Preferences',
        code: `const [prefs, setPrefs] = useStorage('preferences', {
  theme: 'light',
  language: 'en',
});

setPrefs({ ...prefs, theme: 'dark' });`,
      },
      {
        title: 'Persist Form Data',
        code: `const [draft, setDraft] = useStorage<FormData>('draft', null);

const handleChange = (data: FormData) => {
  setDraft(data); // Auto-saves to localStorage
};`,
      },
    ],
  },
  {
    id: 'use-scroll',
    title: 'useScroll',
    description: 'Provides scroll event handlers with calculated scroll position and percentage. Perfect for scroll-based interactions.',
    category: 'hook',
    benefits: [
      'Easy scroll position tracking',
      'Percentage calculation included',
      'Type-safe event handlers',
      'Works with any scrollable element',
      'Lightweight and performant',
      'Reusable scroll logic',
    ],
    parameters: [{ name: 'handler', type: '({ scrollTop, scrollPercentage }) => void', description: 'Callback invoked on scroll' }],
    returns: [{ name: 'registerScrollHandlers', type: '{ onScrollEnd: (ev) => void }', description: 'Object with scroll event handlers' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useScroll } from '@hooks/shared';

const ScrollTracker = () => {
  const { registerScrollHandlers } = useScroll(({ scrollTop, scrollPercentage }) => {
    console.log(\`Scrolled \${scrollPercentage.toFixed(1)}%\`);
    
    if (scrollPercentage > 90) {
      loadMoreContent();
    }
  });

  return (
    <div {...registerScrollHandlers} className="overflow-auto h-96">
      {/* Scrollable content */}
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Scroll Progress Bar',
        code: `const [progress, setProgress] = useState(0);

const { registerScrollHandlers } = useScroll(({ scrollPercentage }) => {
  setProgress(scrollPercentage);
});

return (
  <>
    <ProgressBar value={progress} />
    <div {...registerScrollHandlers}>{content}</div>
  </>
);`,
      },
      {
        title: 'Load More on Scroll',
        code: `const { registerScrollHandlers } = useScroll(({ scrollPercentage }) => {
  if (scrollPercentage > 80 && hasMore && !isLoading) {
    fetchMore();
  }
});

<ScrollArea {...registerScrollHandlers}>{items}</ScrollArea>`,
      },
    ],
  },
  {
    id: 'use-shortcuts',
    title: 'useShortcuts',
    description:
      'Register keyboard shortcuts with support for modifier keys (Shift, Ctrl). Automatically ignores shortcuts when inputs are focused.',
    category: 'hook',
    benefits: [
      'Easy keyboard shortcut registration',
      'Modifier key support (Shift, Ctrl)',
      'Automatically ignores input fields',
      'Enable/disable shortcuts dynamically',
      'Automatic cleanup on unmount',
      'Multiple shortcuts per component',
    ],
    parameters: [
      { name: 'keyMap', type: '{ [key: string]: () => void }', description: 'Map of keys to callback functions' },
      { name: 'enabled', type: 'boolean', description: 'Whether shortcuts are active (default: true)' },
    ],
    returns: [],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useShortcuts } from '@hooks/shared';

const Editor = () => {
  useShortcuts({
    's': () => save(),
    'ctrl+s': () => saveAndExit(),
    'Escape': () => closeModal(),
    'shift+?': () => showHelp(),
  });

  return <div>Press 's' to save, Ctrl+S to save and exit</div>;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Shortcuts',
        code: `useShortcuts({
  'n': () => createNew(),
  'e': () => edit(),
  'd': () => deleteItem(),
});`,
      },
      {
        title: 'Modal with Shortcuts',
        code: `const [isOpen, setIsOpen] = useState(false);

useShortcuts({
  'Escape': () => setIsOpen(false),
  'ctrl+Enter': () => handleSubmit(),
}, isOpen); // Only active when modal is open`,
      },
    ],
  },
  {
    id: 'use-roles',
    title: 'useRoles',
    description: 'Provides role-based access control utilities for authorization and route redirection based on user roles.',
    category: 'hook',
    benefits: [
      'Simple role-based authorization',
      'Check user permissions',
      'Memoized role checks for performance',
      'Automatic redirect URL calculation',
      'Works with useAuth for user context',
      'Type-safe role comparisons',
    ],
    parameters: [],
    returns: [
      { name: 'isAllowed', type: '(roles: ROLES[]) => boolean', description: 'Check if user has any of the roles' },
      { name: 'isSAdmin', type: 'boolean', description: 'True if user is Super Admin' },
      { name: 'isHR', type: 'boolean', description: 'True if user is HR' },
      { name: 'returnURL', type: 'string', description: 'Default redirect URL based on role' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useRoles } from '@hooks/shared';
import { ROLES } from '@app-types';

const AdminPanel = () => {
  const { isAllowed, isSAdmin } = useRoles();

  if (!isAllowed([ROLES.S_ADMIN, ROLES.ADMIN])) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div>
      {isSAdmin && <SuperAdminSettings />}
      <AdminDashboard />
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Conditional Rendering',
        code: `const { isAllowed } = useRoles();

return (
  <>
    {isAllowed([ROLES.ADMIN, ROLES.S_ADMIN]) && (
      <AdminPanel />
    )}
    <UserContent />
  </>
);`,
      },
      {
        title: 'Route Guard',
        code: `const { isAllowed, returnURL } = useRoles();

if (!isAllowed([ROLES.HR, ROLES.MANAGER])) {
  return <Navigate to={returnURL} replace />;
}`,
      },
    ],
  },
  {
    id: 'use-auth',
    title: 'useAuth',
    description: 'Provides authentication state including current user information, authentication status, and loading state.',
    category: 'hook',
    benefits: [
      'Centralized auth state access',
      'Current user information',
      'Loading state for auth checks',
      'Type-safe user data',
      'Works with useRoles for authorization',
      'Simple API for auth checks',
    ],
    parameters: [],
    returns: [
      { name: 'currentUser', type: '{ role: ROLES, email: string, name: string }', description: 'Current authenticated user' },
      { name: 'isAuthed', type: 'boolean', description: 'True if user is authenticated' },
      { name: 'isPending', type: 'boolean', description: 'True if auth check is in progress' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useAuth } from '@hooks/shared';

const UserProfile = () => {
  const { currentUser, isAuthed, isPending } = useAuth();

  if (isPending) return <Loader />;
  
  if (!isAuthed) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      <p>{currentUser.email}</p>
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Auth Guard',
        code: `const { isAuthed, isPending } = useAuth();

if (isPending) return <Loader />;
if (!isAuthed) return <Navigate to="/login" replace />;

return <ProtectedContent />;`,
      },
      {
        title: 'Display User Info',
        code: `const { currentUser } = useAuth();

return (
  <Avatar>
    <Avatar.Fallback>
      {currentUser.name.charAt(0)}
    </Avatar.Fallback>
  </Avatar>
);`,
      },
    ],
  },
  {
    id: 'use-api-error',
    title: 'useApiError',
    description: 'Handles API errors by displaying toast notifications with detailed error messages from ApiError objects.',
    category: 'hook',
    benefits: [
      'Automatic error toast display',
      'Handles structured API errors',
      'Shows all error details from API',
      'Integrates with useToast',
      'Simple one-line error handling',
      'Consistent error UX',
    ],
    parameters: [],
    returns: [{ name: 'renderApiError', type: '(e: Error) => void', description: 'Display error(s) as toast notifications' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useApiError } from '@hooks/shared';

const CreateUser = () => {
  const { renderApiError } = useApiError();
  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      renderApiError(error);
    },
  });

  return (
    <Form onSubmit={(data) => mutation.mutate(data)}>
      {/* Form fields */}
    </Form>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Mutation Error Handling',
        code: `const { renderApiError } = useApiError();

const mutation = useMutation({
  mutationFn: updateProfile,
  onError: renderApiError,
});`,
      },
      {
        title: 'Manual Error Display',
        code: `const { renderApiError } = useApiError();

try {
  await api.deleteUser(userId);
} catch (error) {
  renderApiError(error);
}`,
      },
    ],
  },
  {
    id: 'use-callback-ref',
    title: 'useCallbackRef',
    description:
      'Converts a callback to a stable ref to prevent re-renders when passed as props or re-executing effects when used as dependencies.',
    category: 'hook',
    benefits: [
      'Stable callback reference',
      'Prevents unnecessary re-renders',
      'Avoids effect re-execution',
      'Always uses latest callback',
      'Radix UI primitives compatible',
      'Minimal performance overhead',
    ],
    parameters: [{ name: 'callback', type: 'T extends (...args) => unknown', description: 'Callback function to stabilize' }],
    returns: [{ name: 'stableCallback', type: 'T', description: 'Stable callback reference' }],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useCallbackRef } from '@hooks/shared';

const Parent = () => {
  const [count, setCount] = useState(0);
  
  // Child won't re-render when count changes
  const handleClick = useCallbackRef(() => {
    console.log('Current count:', count);
  });

  return <Child onClick={handleClick} />;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Prevent Effect Re-run',
        code: `const callback = useCallbackRef((data) => {
  console.log('Data:', data, state);
});

useEffect(() => {
  window.addEventListener('message', callback);
  return () => window.removeEventListener('message', callback);
}, [callback]); // Won't re-run when state changes`,
      },
      {
        title: 'Stable Event Handler',
        code: `const handleChange = useCallbackRef((value) => {
  // Uses latest props/state without causing re-renders
  props.onChange?.(value);
});

return <Input onChange={handleChange} />;`,
      },
    ],
  },
  {
    id: 'use-pdf-download',
    title: 'usePdfDownload',
    description:
      'Custom hook to download any HTML element as PDF. Perfect for exporting visible sections, reports, or any on-screen content.',
    category: 'hook',
    benefits: [
      'Download any HTML element as PDF',
      'Preserves colors, styles, and formatting',
      'Loading state management',
      'Error handling built-in',
      'Flexible PDF options (orientation, scale, padding)',
      'Works with React refs',
      'Custom filename support',
    ],
    parameters: [
      { name: 'elementRef', type: 'RefObject<T>', description: 'React ref to the HTML element you want to download' },
      { name: 'defaultOptions', type: 'ExportPdfOptions', description: 'Default PDF export options (can be overridden per download)' },
    ],
    returns: [
      { name: 'isDownloading', type: 'boolean', description: 'True when PDF is being generated' },
      { name: 'downloadPdf', type: '(options?: ExportPdfOptions) => Promise<void>', description: 'Function to trigger PDF download' },
      { name: 'error', type: 'Error | null', description: 'Error object if download fails' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { usePdfDownload } from '@hooks/utils';
import { useRef } from 'react';

const ReportPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { isDownloading, downloadPdf } = usePdfDownload(reportRef, {
    filename: 'report',
    orientation: 'portrait',
    canvasScale: 2,
  });

  return (
    <div>
      <Button 
        onClick={() => downloadPdf()} 
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download PDF'}
      </Button>
      <div ref={reportRef} className="bg-background p-6">
        <h1>Report Content</h1>
        <p>This will be exported as PDF</p>
      </div>
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Usage',
        code: `const sectionRef = useRef<HTMLDivElement>(null);
const { isDownloading, downloadPdf } = usePdfDownload(sectionRef);

<div ref={sectionRef}>
  <YourContent />
</div>
<Button onClick={() => downloadPdf()} disabled={isDownloading}>
  Download
</Button>`,
      },
      {
        title: 'With Default Options',
        code: `const { downloadPdf } = usePdfDownload(ref, {
  filename: 'my-report',
  orientation: 'landscape',
  canvasScale: 2,
  paddingPx: 20,
});

// Options can be overridden per download
downloadPdf({ filename: 'custom-name' });`,
      },
      {
        title: 'Custom Page Format',
        code: `const { downloadPdf } = usePdfDownload(ref, {
  pageFormat: { width: 800, height: 600 },
  orientation: 'landscape',
});

downloadPdf();`,
      },
      {
        title: 'Error Handling',
        code: `const { error, downloadPdf } = usePdfDownload(ref);

const handleDownload = async () => {
  try {
    await downloadPdf();
  } catch (err) {
    toast.error('Failed to download PDF');
  }
};

{error && <Alert>Error: {error.message}</Alert>}`,
      },
    ],
  },
  {
    id: 'use-pdf-download-component',
    title: 'usePdfDownloadComponent',
    description:
      'Custom hook to download a React component as PDF without displaying it on the page. Perfect for generating invoices, reports, or templates.',
    category: 'hook',
    benefits: [
      'Download React components without rendering on page',
      'Generate PDFs from templates or invoices',
      'Pass props to component dynamically',
      'Loading state management',
      'Error handling built-in',
      'Flexible PDF options',
      'Custom wrapper support',
    ],
    parameters: [
      { name: 'defaultOptions', type: 'ExportPdfOptions', description: 'Default PDF export options (can be overridden per download)' },
    ],
    returns: [
      { name: 'isDownloading', type: 'boolean', description: 'True when PDF is being generated' },
      {
        name: 'downloadPdf',
        type: '<T>(Component: ComponentType<T>, props: T, options?: ExportPdfOptions) => Promise<void>',
        description: 'Function to generate PDF from React component',
      },
      { name: 'error', type: 'Error | null', description: 'Error object if download fails' },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { usePdfDownloadComponent } from '@hooks/utils';

const InvoicePage = () => {
  const { isDownloading, downloadPdf } = usePdfDownloadComponent({
    orientation: 'portrait',
    canvasScale: 2,
  });

  const handleDownload = async () => {
    await downloadPdf(
      InvoiceTemplate,
      {
        invoiceNumber: 'INV-001',
        customer: 'John Doe',
        amount: 1500,
      },
      { filename: 'invoice-INV-001' }
    );
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? 'Generating PDF...' : 'Download Invoice'}
    </Button>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Component Download',
        code: `const { downloadPdf } = usePdfDownloadComponent();

await downloadPdf(
  InvoiceTemplate,
  { invoiceNumber: '001', customer: 'John' }
);`,
      },
      {
        title: 'With Custom Options',
        code: `const { downloadPdf } = usePdfDownloadComponent({
  orientation: 'landscape',
  canvasScale: 2,
  containerWidth: '210mm',
  containerHeight: '297mm',
});

await downloadPdf(
  ReportTemplate,
  { data: reportData },
  { filename: 'custom-report' }
);`,
      },
      {
        title: 'Invoice Generation',
        code: `const handleGenerateInvoice = async (orderId: string) => {
  const order = await fetchOrder(orderId);
  
  await downloadPdf(
    InvoiceComponent,
    {
      orderNumber: order.id,
      customer: order.customer,
      items: order.items,
      total: order.total,
      date: new Date(),
    },
    { filename: \`invoice-\${order.id}\` }
  );
};`,
      },
      {
        title: 'With Wrapper Component',
        code: `const { downloadPdf } = usePdfDownloadComponent({
  wrapper: (node) => (
    <div className="bg-white p-8">
      <Header />
      {node}
      <Footer />
    </div>
  ),
});

await downloadPdf(ContentComponent, { data });`,
      },
    ],
  },
  {
    id: 'use-app-translation',
    title: 'useAppTranslation',
    description:
      'Enhanced i18n translation hook with RTL support, language switching, and property translation. Built on react-i18next with Arabic and English support.',
    category: 'hook',
    benefits: [
      'Full i18n translation support with react-i18next',
      'RTL (Right-to-Left) language support for Arabic',
      'Language switching with URL updates',
      'Automatic direction detection (ltr/rtl)',
      'Translate properties from API responses',
      'Namespace support for organized translations',
      'Language configuration with flags and names',
      'Ready state for loading translations',
    ],
    parameters: [
      {
        name: 'namespace',
        type: 'Namespace',
        description: 'Optional translation namespace (default: "translation")',
      },
    ],
    returns: [
      { name: 't', type: 'TFunction', description: 'Translation function from react-i18next' },
      { name: 'currentLanguage', type: 'LANGUAGES', description: 'Current active language code (e.g., "en", "ar")' },
      { name: 'ready', type: 'boolean', description: 'True when translations are loaded and ready' },
      { name: 'i18n', type: 'i18n', description: 'i18next instance for advanced usage' },
      {
        name: 'currentLanguageConfig',
        type: 'LanguageOption | undefined',
        description: 'Current language configuration object with code, name, and flag',
      },
      {
        name: 'availableLanguages',
        type: 'LanguageOption[]',
        description: 'Array of all available language options',
      },
      { name: 'isRTL', type: 'boolean', description: 'True if current language is RTL (Arabic)' },
      { name: 'direction', type: "'ltr' | 'rtl'", description: 'Text direction for current language' },
      {
        name: 'oppositeLanguage',
        type: 'LANGUAGES',
        description: 'Get the opposite language code (EN ↔ AR)',
      },
      {
        name: 'availableNamespaces',
        type: 'Namespace[]',
        description: 'Array of all available translation namespaces',
      },
      {
        name: 'changeLanguage',
        type: '(lng: LANGUAGES) => void',
        description: 'Function to change the current language',
      },
      {
        name: 'translateProperty',
        type: '(property: Partial<TranslatedProperty>) => any',
        description: 'Translate property from API response based on current language',
      },
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { useAppTranslation } from '@hooks/shared';
import { LANGUAGES } from '@constants';

const MyComponent = () => {
  const { t, currentLanguage, isRTL, direction, changeLanguage } = useAppTranslation();

  return (
    <div dir={direction}>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      
      <Button onClick={() => changeLanguage(LANGUAGES.AR)}>
        Switch to Arabic
      </Button>
      
      {isRTL && <span>RTL Layout Active</span>}
    </div>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Translation',
        code: `const { t } = useAppTranslation();

<h1>{t('welcome.title')}</h1>
<p>{t('common.save')}</p>`,
      },
      {
        title: 'With Namespace',
        code: `const { t } = useAppTranslation('users');

// Uses translations from 'users' namespace
<h1>{t('list.title')}</h1>
<p>{t('list.description')}</p>`,
      },
      {
        title: 'Language Switching',
        code: `const { changeLanguage, currentLanguage } = useAppTranslation();
import { LANGUAGES } from '@constants';

<Button onClick={() => changeLanguage(LANGUAGES.AR)}>
  العربية
</Button>

<Button onClick={() => changeLanguage(LANGUAGES.EN)}>
  English
</Button>

<p>Current: {currentLanguage}</p>`,
      },
      {
        title: 'RTL Support',
        code: `const { isRTL, direction } = useAppTranslation();

<div dir={direction} className={isRTL ? 'rtl-layout' : 'ltr-layout'}>
  <h1>Content</h1>
  {isRTL && <span>RTL mode active</span>}
</div>`,
      },
      {
        title: 'Translate API Properties',
        code: `const { translateProperty } = useAppTranslation();

// API returns: { name_en_US: 'Product', name_ar_SA: 'منتج' }
const product = {
  name_en_US: 'Product',
  name_ar_SA: 'منتج',
};

const translatedName = translateProperty(product);
// Returns 'Product' if EN, 'منتج' if AR`,
      },
      {
        title: 'Language Configuration',
        code: `const { 
  currentLanguageConfig, 
  availableLanguages,
  oppositeLanguage 
} = useAppTranslation();

// Display language options
{availableLanguages.map(lang => (
  <Button key={lang.code} onClick={() => changeLanguage(lang.code)}>
    {lang.flag} {lang.name}
  </Button>
))}

// Get current language info
const current = currentLanguageConfig;
// { code: 'en', name: 'English', flag: '🇺🇸' }

// Get opposite language
const otherLang = oppositeLanguage; // 'ar' if current is 'en'`,
      },
      {
        title: 'Ready State',
        code: `const { t, ready } = useAppTranslation();

if (!ready) {
  return <Loader />;
}

return <div>{t('content.loaded')}</div>`,
      },
    ],
  },

  // ==================== UTILITIES ====================
  {
    id: 'api-utils',
    title: 'apiUtils',
    description: 'Type-safe path building utilities for constructing API routes with dynamic parameters and query strings.',
    category: 'utility',
    benefits: [
      'Type-safe path parameters with TypeScript',
      'Automatic URL encoding',
      'Query parameter support',
      'Route parameter extraction from paths',
      'Removes React Router params from paths',
      'Construct plain routes from nested route objects',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { pathBuilder } from '@utils';

// Type-safe path building
const userUrl = pathBuilder({
  path: '/users/:userId/posts/:postId',
  pathParams: { userId: 123, postId: 456 },
  queryParams: 'sort=date&order=desc'
});
// Result: '/users/123/posts/456?sort=date&order=desc'`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Path Building',
        code: `const path = pathBuilder({
  path: '/users/:userId',
  pathParams: { userId: 42 },
});
// '/users/42'`,
      },
      {
        title: 'With Query Parameters',
        code: `const path = pathBuilder({
  path: '/api/products/:id',
  pathParams: { id: 'abc-123' },
  queryParams: 'include=reviews&limit=10',
});
// '/api/products/abc-123?include=reviews&limit=10'`,
      },
      {
        title: 'Remove Route Parameters',
        code: `import { removeReactRoutesParamFromPath } from '@utils';

const cleanPath = removeReactRoutesParamFromPath('/users/:userId/edit');
// '/users'`,
      },
      {
        title: 'Construct Plain Routes',
        code: `import { constructPlainRoutes } from '@utils';

const routes = {
  USERS: {
    INDEX: '/users',
    DETAIL: '/users/:userId',
    EDIT: '/users/:userId/edit',
  },
};

const plainRoutes = constructPlainRoutes(routes);
// { USERS: { INDEX: '/users', DETAIL: '/users', EDIT: '/users' } }`,
      },
    ],
  },
  {
    id: 'auth-utils',
    title: 'auth (generateToken)',
    description: 'Utility for securely copying authentication tokens to clipboard for testing and development.',
    category: 'utility',
    benefits: [
      'Quick token copying for development',
      'Automatic clipboard API usage',
      'Error handling built-in',
      'Console logging for debugging',
      'Temporary element cleanup',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { generateToken } from '@utils';

const CopyTokenButton = ({ token }) => {
  const handleCopy = async () => {
    await generateToken(token);
    toast({ title: 'Token copied!' });
  };

  return (
    <Button onClick={handleCopy}>
      Copy Auth Token
    </Button>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Copy JWT Token',
        code: `const token = 'eyJhbGciOiJIUzI1NiIs...';
await generateToken(token);
// Token copied to clipboard!`,
      },
      {
        title: 'Development Tools',
        code: `// In dev tools or debug panel
<Button onClick={() => generateToken(authToken)}>
  Copy Token for API Testing
</Button>`,
      },
    ],
  },
  {
    id: 'data-table-utils',
    title: 'data-table',
    description: 'Utilities for advanced data table functionality including column pinning, filter operators, and filter validation.',
    category: 'utility',
    benefits: [
      'Column pinning with shadows and positioning',
      'Dynamic filter operators based on data type',
      'Default operator selection',
      'Filter validation and cleaning',
      'Styling helpers for sticky columns',
      'Support for all filter variants (text, number, date, select, etc.)',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { getCommonPinningStyles, getFilterOperators } from '@utils';

// Column pinning styles
const cell = {
  ...getCommonPinningStyles({ column, withBorder: true })
};

// Get filter operators
const operators = getFilterOperators('text');
// [{ label: 'Contains', value: 'iLike' }, ...]`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Sticky Column Styles',
        code: `const styles = getCommonPinningStyles({
  column: column,
  withBorder: true,
});
// { left: '0px', position: 'sticky', zIndex: 1, ... }`,
      },
      {
        title: 'Filter Operators',
        code: `const textOps = getFilterOperators('text');
// [{ label: 'Contains', value: 'iLike' }, ...]

const numberOps = getFilterOperators('number');
// [{ label: 'Equals', value: 'eq' }, ...]`,
      },
      {
        title: 'Default Operator',
        code: `import { getDefaultFilterOperator } from '@utils';

const defaultOp = getDefaultFilterOperator('date');
// 'eq' (equals)`,
      },
      {
        title: 'Validate Filters',
        code: `import { getValidFilters } from '@utils';

const filters = [
  { id: 'name', value: 'John' },
  { id: 'age', value: '' },  // Empty
  { id: 'tags', value: [] }, // Empty array
];

const valid = getValidFilters(filters);
// [{ id: 'name', value: 'John' }]`,
      },
    ],
  },
  {
    id: 'media-utils',
    title: 'media (downloadBlob)',
    description: 'Utility for downloading blob data as files. Perfect for exporting data, images, or documents.',
    category: 'utility',
    benefits: [
      'Simple blob to file download',
      'Automatic cleanup of object URLs',
      'Custom filename support',
      'Error handling included',
      'Works with any blob data',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { downloadBlob } from '@utils';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    downloadBlob(blob, 'export.json');
  };

  return <Button onClick={handleExport}>Export</Button>;
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Export JSON',
        code: `const jsonBlob = new Blob(
  [JSON.stringify(data, null, 2)],
  { type: 'application/json' }
);
downloadBlob(jsonBlob, 'data.json');`,
      },
      {
        title: 'Export CSV',
        code: `const csv = convertToCSV(data);
const csvBlob = new Blob([csv], { type: 'text/csv' });
downloadBlob(csvBlob, 'report.csv');`,
      },
      {
        title: 'Download Image',
        code: `const response = await fetch(imageUrl);
const blob = await response.blob();
downloadBlob(blob, 'image.png');`,
      },
    ],
  },
  {
    id: 'parsers',
    title: 'parsers',
    description: 'Custom parsers for URL query parameters, specifically for sorting and filtering states in data tables.',
    category: 'utility',
    benefits: [
      'Type-safe URL query parsing',
      'Custom sorting state parser',
      'Custom filtering state parser',
      'Column ID validation',
      'Zod schema validation',
      'Equality comparison for optimization',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { getSortingStateParser } from '@utils';
import { useQueryState } from 'nuqs';

const columnIds = ['name', 'email', 'createdAt'];

const [sorting, setSorting] = useQueryState(
  'sort',
  getSortingStateParser(columnIds)
);

// URL: ?sort=[{"id":"name","desc":false}]
// sorting: [{ id: 'name', desc: false }]`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Sorting Parser',
        code: `const parser = getSortingStateParser(['name', 'age']);

// Parse from URL
const sorting = parser.parse('[{"id":"name","desc":true}]');
// [{ id: 'name', desc: true }]

// Serialize to URL
const str = parser.serialize(sorting);
// '[{"id":"name","desc":true}]'`,
      },
      {
        title: 'Filtering Parser',
        code: `import { getFiltersStateParser } from '@utils';

const parser = getFiltersStateParser(['name', 'status']);

const filters = parser.parse('[
  {"id":"status","value":"active","variant":"select","operator":"eq"}
]');`,
      },
      {
        title: 'With Column Validation',
        code: `const validCols = new Set(['name', 'email', 'age']);
const parser = getSortingStateParser(validCols);

// Invalid column IDs are rejected
const result = parser.parse('[{"id":"invalid","desc":true}]');
// null`,
      },
    ],
  },
  {
    id: 'storage',
    title: 'storage',
    description: 'Type-safe localStorage utilities for persisting and retrieving data with automatic JSON serialization.',
    category: 'utility',
    benefits: [
      'Type-safe data persistence',
      'Automatic JSON serialization/deserialization',
      'Default value support',
      'Error handling built-in',
      'Generic types for flexibility',
      'Simple API with two functions',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { persistData, getPersistentData } from '@utils';

// Save data
const user = { id: 1, name: 'John' };
persistData('currentUser', user);

// Retrieve data
const savedUser = getPersistentData<User>('currentUser', null);

// With default value
const theme = getPersistentData<string>('theme', 'light');`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Save User Preferences',
        code: `const preferences = {
  theme: 'dark',
  language: 'en',
  pageSize: 25,
};

persistData('user-prefs', preferences);`,
      },
      {
        title: 'Retrieve with Default',
        code: `const prefs = getPersistentData<Preferences>(
  'user-prefs',
  { theme: 'light', language: 'en', pageSize: 10 }
);`,
      },
      {
        title: 'Save Complex Data',
        code: `const tableState = {
  sorting: [{ id: 'name', desc: false }],
  filters: [{ id: 'status', value: 'active' }],
  pagination: { pageIndex: 0, pageSize: 20 },
};

persistData('table-state', tableState);

const restored = getPersistentData<TableState>('table-state');`,
      },
    ],
  },
  {
    id: 'tailwind',
    title: 'tailwind (cn)',
    description: 'Utility function for merging Tailwind CSS class names with conflict resolution. Essential for component styling.',
    category: 'utility',
    benefits: [
      'Merge multiple class names intelligently',
      'Resolves Tailwind class conflicts',
      'Handles conditional classes',
      'Removes duplicate classes',
      'Type-safe with ClassValue type',
      'Supports all class name formats (string, array, object)',
    ],
    usage: (
      <Card>
        <Card.Content className="pt-6">
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
            {`import { cn } from '@utils';

const Button = ({ className, variant }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-secondary text-black',
        className
      )}
    >
      Click me
    </button>
  );
};`}
          </pre>
        </Card.Content>
      </Card>
    ),
    examples: [
      {
        title: 'Basic Merging',
        code: `cn('px-4 py-2', 'rounded-md', 'text-white')
// 'px-4 py-2 rounded-md text-white'`,
      },
      {
        title: 'Conflict Resolution',
        code: `// Later classes override earlier ones
cn('p-4', 'p-2')
// 'p-2'

cn('bg-red-500', 'bg-blue-500')
// 'bg-blue-500'`,
      },
      {
        title: 'Conditional Classes',
        code: `cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className // Props override
)`,
      },
      {
        title: 'Component Variants',
        code: `const buttonClass = cn(
  'button-base',
  {
    'button-primary': variant === 'primary',
    'button-secondary': variant === 'secondary',
    'button-large': size === 'lg',
    'button-small': size === 'sm',
  },
  className
);`,
      },
    ],
  },
];

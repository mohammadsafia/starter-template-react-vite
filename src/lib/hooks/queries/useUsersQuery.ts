import { UserHandler } from '@api/handlers';
import { usePaginatedDataTableQuery } from '@hooks/utils';

export const useUsersQuery = () => {
  const query = usePaginatedDataTableQuery({
    queryKey: [UserHandler.list.queryKey],
    queryFn: UserHandler.list.request,
  });

  return {
    ...query,
  };
};

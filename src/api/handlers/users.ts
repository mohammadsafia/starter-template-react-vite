import { ApiEndpoints, HttpClient } from '@api/config';
const URL = ApiEndpoints.USERS;

async function getUsers(queryParams: string) {
  return HttpClient.get<any>(`${URL.INDEX}?${queryParams}`);
}

export const UserHandler = {
  list: {
    queryKey: 'user-management/get-users',
    request: getUsers,
  }
} as const;

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Invited' | 'Disabled';
  createdAt: string;
};

export const mockUsers: MockUser[] = Array.from({ length: 24 }).map((_, i) => {
  const roles = ['Admin', 'Editor', 'Viewer'] as const;
  const statuses = ['Active', 'Invited', 'Disabled'] as const;
  const role = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const id = (i + 1).toLocaleString();
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role,
    status,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});



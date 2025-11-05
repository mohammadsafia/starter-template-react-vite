export type MockActivity = {
  id: string;
  user: string;
  action: string;
  at: string;
};

const actions = [
  'created project',
  'updated settings',
  'invited a member',
  'archived item',
  'deleted record',
  'exported data',
];

export const mockActivity: MockActivity[] = Array.from({ length: 18 }).map((_, i) => {
  const id = (i + 1).toString();
  return {
    id,
    user: `User ${((i % 10) + 1).toString()}`,
    action: actions[i % actions.length],
    at: new Date(Date.now() - i * 3600000).toISOString(),
  };
});



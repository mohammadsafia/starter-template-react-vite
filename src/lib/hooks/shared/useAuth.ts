import { ROLES } from '@app-types';

export const useAuth = () => {
  return {
    isPending: false,
    currentUser: {
      role: ROLES.ALL,
      email: 'admin@gmail.com',
      name: 'admin',
    },
    isAuthed: true,
  };
};

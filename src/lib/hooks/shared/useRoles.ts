import { useCallback, useMemo } from 'react';

import { useAuth } from './useAuth';

import { ROUTES_PATH } from '@routes';

import { ROLES } from '@app-types';

export const useRoles = () => {
  const { currentUser } = useAuth();

  const returnURL = useMemo(() => {
    if (currentUser.role === ROLES.HR) return ROUTES_PATH.HOME.INDEX;

    return ROUTES_PATH.HOME.INDEX;
  }, [currentUser.role]);

  const isSAdmin = useMemo(() => {
    return currentUser.role === ROLES.S_ADMIN;
  }, [currentUser.role]);

  const isHR = useMemo(() => {
    return currentUser.role === ROLES.HR;
  }, [currentUser.role]);

  const isAllowed = useCallback(
    (roles: ROLES[]) => {
      if (roles.includes(ROLES.ALL)) return true;

      if (!currentUser.role) return false;

      return roles.includes(currentUser.role as ROLES);
    },
    [currentUser.role],
  );

  return {
    isAllowed,
    isSAdmin,
    isHR,
    returnURL,
  };
};

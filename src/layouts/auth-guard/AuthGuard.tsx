import type { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loader } from '@components/shared';
import { useAuth, useRoles } from '@hooks/shared';

import { ROUTES_PATH } from '@routes';

import { ROLES } from '@app-types';

type AuthGuardProps = PropsWithChildren<{
  roles: ROLES[];
}>;

function AuthGuard(props: AuthGuardProps) {
  const { isAuthed, isPending } = useAuth();
  const { isAllowed, returnURL } = useRoles();

  if (isPending) return <Loader />;

  if (!isAuthed) return <Navigate to={ROUTES_PATH.HOME.INDEX} replace />;

  if (!isAllowed(props.roles)) return <Navigate to={returnURL} replace />;

  return props.children ?? <Outlet />;
}

export default AuthGuard;

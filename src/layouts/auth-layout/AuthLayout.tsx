import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Toaster } from '@components/shared';

import { ThemeProvider } from '@contexts';
import { useAuth } from '@hooks/shared';

import { ROUTES_PATH } from '@routes';

function AuthLayout() {
  const { pathname } = useLocation();
  const { isAuthed } = useAuth();

  if (isAuthed && !pathname.includes(ROUTES_PATH.AUTH.INVITED_USER)) return <Navigate to={ROUTES_PATH.HOME.INDEX} replace />;

  return (
    <ThemeProvider>
      <Toaster />

      <div className="bg-background flex h-screen w-screen items-center justify-center">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default AuthLayout;

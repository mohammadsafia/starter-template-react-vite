import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardHeader from '@layouts/dashboard-header';
import DashboardSidebar from '@layouts/dashboard-sidebar';
import { Loader, Toaster } from '@components/shared';

import { ThemeProvider } from '@contexts';

function DashboardLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-dvh flex-col flex-wrap md:flex-row md:flex-nowrap">
        <DashboardSidebar />

        <div className="flex grow flex-col [&>*]:shrink-0">
          <DashboardHeader />

          <main className="relative grow p-2 md:px-10 md:py-4">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default DashboardLayout;

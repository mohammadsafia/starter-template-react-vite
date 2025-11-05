import { useState } from 'react';

import DashboardSidebarDrawer from '@layouts/dashboard-sidebar-drawer';
import { DashboardSidebarLink, SidebarSubLink, SidebarSubLinkDropdown } from '@layouts/dashboard-sidebar-link';
import { cn } from '@utils';
import { APP_MENU } from '@routes';

function DashboardSidebar() {
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const onToggleCollapse = () => setCollapse((prevState) => !prevState);

  const onToggleMenu = () => {
    setShowMenu((prevState) => !prevState);

    setCollapse(false);
  };

  return (
    <aside
      className={cn(
        'bg-background sticky top-0 z-50 w-full transition-[width] md:relative md:start-2',
        collapse ? 'md:w-[55px]' : 'md:w-64',
      )}
    >
      <div
        className={cn(
          'md:border-accent md:sticky md:top-2 md:flex md:h-[calc(100dvh-15px)] md:flex-col md:rounded-xl md:border md:shadow-sm',
          showMenu && 'h-svh',
        )}
      >
        <header className="flex justify-between px-2 py-3">
          <span className="from-primary to-secondary/40 overflow-hidden bg-gradient-to-b bg-clip-text text-2xl font-medium text-ellipsis whitespace-nowrap text-transparent">
            Logo
          </span>

          <DashboardSidebarDrawer variant="mobile" collapse={showMenu} onCollapse={onToggleMenu} />
        </header>

        <nav
          className={cn(
            'md:max-h-none md:overflow-auto',
            showMenu ? 'max-h-screen' : 'max-h-0 overflow-hidden',
            showMenu && 'animate-in slide-in-from-top transition duration-500 ease-in-out',
          )}
        >
          {APP_MENU.map((route) => {
            if (route.submenu && collapse) return <SidebarSubLinkDropdown key={route.id} route={route} collapse={collapse} />;

            if (route.submenu) return <SidebarSubLink key={route.id} route={route} collapse={collapse} />;

            return <DashboardSidebarLink key={route.id} route={route} collapse={collapse} />;
          })}
        </nav>

        <DashboardSidebarDrawer collapse={!collapse} onCollapse={onToggleCollapse} />
      </div>
    </aside>
  );
}

export default DashboardSidebar;

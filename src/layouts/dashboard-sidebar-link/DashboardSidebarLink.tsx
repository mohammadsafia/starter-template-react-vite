import { Link } from 'react-router-dom';

import { Collapsible, DropdownMenu } from '@components/ui';

import { useRoles } from '@hooks/shared';
import { useRouteUtils } from '@hooks/utils';
import { cn } from '@utils';
import { type AppMenu, ROUTES_PATH } from '@routes';

import { ChevronDown } from 'lucide-react';

type SidebarLinkProps = {
  route: AppMenu;
  collapse: boolean;
  subLink?: boolean;
  dropdownOption?: boolean;
};

export function SidebarSubLinkDropdown({ route, collapse }: SidebarLinkProps) {
  const { isActiveSubLink } = useRouteUtils();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <div
          role="button"
          title={route.name ?? route.path}
          className={cn(
            'group text-primary hover:bg-primary hover:text-primary-foreground relative mt-3 flex w-full cursor-pointer items-center justify-normal overflow-clip px-3 py-2 text-sm transition-colors duration-300',
            isActiveSubLink(route.path) && 'bg-primary text-background font-bold',
          )}
        >
          {<route.icon />}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content side="right" align="start" sideOffset={4}>
        <DropdownMenu.Label className="text-primary">{route.name}</DropdownMenu.Label>

        <DropdownMenu.Separator />

        {route.submenu!.map((subRoute) => (
          <DropdownMenu.Item key={subRoute.id} asChild>
            <DashboardSidebarLink route={subRoute} collapse={collapse} dropdownOption />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export function SidebarSubLink({ route, collapse }: SidebarLinkProps) {
  const { isActiveLink, isActiveSubLink } = useRouteUtils();

  return (
    <Collapsible defaultOpen={isActiveLink(route.path)}>
      <Collapsible.Trigger
        className={cn(
          'group text-primary hover:bg-primary hover:text-primary-foreground mt-3 flex w-full cursor-pointer items-center overflow-clip px-3 py-2 text-sm transition-colors duration-300',
          isActiveSubLink(route.path) && 'bg-primary text-background font-bold',
        )}
      >
        <div className="mr-2">{<route.icon />}</div>

        {route.name}

        <ChevronDown className='ml-auto transition-all group-data-[state="open"]:-rotate-180' />
      </Collapsible.Trigger>

      <Collapsible.Content asChild>
        <ul>
          {route.submenu!.map((subRoute) => (
            <li key={subRoute.id} className="my-1 ml-8">
              <DashboardSidebarLink route={subRoute} subLink collapse={collapse} />
            </li>
          ))}
        </ul>
      </Collapsible.Content>
    </Collapsible>
  );
}

function DashboardSidebarLink({ route, collapse, subLink, dropdownOption }: SidebarLinkProps) {
  const { isAllowed } = useRoles();
  const { isActiveLink } = useRouteUtils();

  return (
    <Link
      title={route.name ?? route.path}
      to={route.path === ROUTES_PATH.HOME.INDEX || route.path === ROUTES_PATH.ROOT.INDEX ? route.path : `/${route.path}`}
      className={cn(
        'group text-primary hover:bg-primary hover:text-primary-foreground mt-3 flex cursor-pointer items-center overflow-clip px-3 py-2 transition-colors duration-300',
        {
          hidden: !isAllowed(route.roles),
          'bg-primary text-background font-bold': isActiveLink(route.path),
          'text-nowrap lg:rounded-none': collapse,
          'h-10 w-full border-l border-l-slate-500 px-2': subLink,
        },
      )}
    >
      <span>{<route.icon />}</span>

      <span
        className={cn('block ps-4 text-sm tracking-wide', {
          'opacity-0 transition-all': collapse && !dropdownOption,
        })}
      >
        {route.name ?? route.path}
      </span>
    </Link>
  );
}

export default DashboardSidebarLink;

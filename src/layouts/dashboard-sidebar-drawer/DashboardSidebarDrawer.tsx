import { Button } from '@components/ui';
import { cn } from '@utils';

import { ChevronsLeft, MenuIcon, XIcon } from 'lucide-react';

type DashboardSidebarDrawerProps = {
  collapse: boolean;
  onCollapse: () => void;
  className?: string;
  iconSize?: number;
  variant?: 'mobile' | 'desktop';
};

function MobileSidebarDrawer(props: DashboardSidebarDrawerProps) {
  return (
    <Button size="icon" variant="icon" className={cn('md:hidden', props.className)} onClick={props.onCollapse}>
      {props.collapse ? <XIcon /> : <MenuIcon />}
    </Button>
  );
}

function DesktopSidebarDrawer(props: DashboardSidebarDrawerProps) {
  return (
    <Button
      size="icon"
      variant="icon"
      className={cn('absolute -end-5 top-1/2 z-50 hidden rounded-full md:inline-flex', props.className)}
      onClick={props.onCollapse}
    >
      <ChevronsLeft size={props.iconSize ?? 20} className={cn('h-5 w-5', !props.collapse && 'rotate-180')} />
    </Button>
  );
}

function DashboardSidebarDrawer({ variant = 'desktop', ...props }: DashboardSidebarDrawerProps) {
  return variant === 'mobile' ? <MobileSidebarDrawer {...props} /> : <DesktopSidebarDrawer {...props} />;
}

export default DashboardSidebarDrawer;

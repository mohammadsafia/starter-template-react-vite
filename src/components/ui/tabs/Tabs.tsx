import { type ComponentPropsWithoutRef, type FC } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>;
type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>;
type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

type TabsComponent = typeof TabsPrimitive.Root & {
  List: FC<TabsListProps>;
  Trigger: FC<TabsTriggerProps>;
  Content: FC<TabsContentProps>;
};

const tabsListVariants = cva('inline-flex items-center justify-center rounded-lg p-1 gap-1 overflow-x-auto scrollbar-hide', {
  variants: {
    variant: {
      default: 'bg-secondary text-secondary-foreground w-full',
      compact: 'w-auto',
      plain: 'text-secondary-foreground bg-transparent',
      compactPlain: 'w-auto text-secondary-foreground bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm ring-offset-background data-[state=active]:bg-background data-[state=active]:text-foreground hover:bg-background hover:text-foreground',
  {
    variants: {
      variant: {
        default: 'grow',
        fitContent: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const List: FC<TabsListProps> = ({ className, variant, ...props }) => (
  <TabsPrimitive.List data-slot="tabs-list" className={cn(tabsListVariants({ variant }), className)} {...props} />
);

const Trigger: FC<TabsTriggerProps> = ({ className, variant, ...props }) => (
  <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn(tabsTriggerVariants({ variant }), className)} {...props} />
);

const Content: FC<TabsContentProps> = ({ className, ...props }) => (
  <TabsPrimitive.Content data-slot="tabs-content" className={cn('mt-2 focus-visible:outline-none', className)} {...props} />
);

const Tabs: TabsComponent = TabsPrimitive.Root as unknown as TabsComponent;

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;

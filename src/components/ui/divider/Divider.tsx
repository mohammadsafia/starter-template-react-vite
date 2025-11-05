import { type ComponentPropsWithoutRef, type FC } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@utils';

type DividerProps = ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

type DividerComponent = FC<DividerProps>;

const Divider: DividerComponent = ({ className, orientation = 'horizontal', decorative = true, ...props }) => (
  <SeparatorPrimitive.Root
    data-slot="divider"
    decorative={decorative}
    orientation={orientation}
    className={cn('bg-accent shrink-0', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
    {...props}
  />
);

Divider.displayName = SeparatorPrimitive.Root.displayName;

export default Divider;

import { type ComponentPropsWithoutRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

export type BadgeProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof badgeVariants>;

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success: 'border-transparent bg-green-500 text-white [a&]:hover:bg-green-600',
        warning: 'border-transparent bg-yellow-100 text-black [a&]:hover:bg-yellow-500',
        info: 'border-transparent bg-blue-700 text-white [a&]:hover:bg-blue-600',
        orange: 'border-transparent bg-yellow-500 text-white [a&]:hover:bg-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export default Badge;

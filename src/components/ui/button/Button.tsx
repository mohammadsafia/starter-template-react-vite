import { type ButtonHTMLAttributes, type RefCallback } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';
import * as React from 'react';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    ref?: RefCallback<HTMLButtonElement>;
    asChild?: boolean;
  };

export const buttonVariants = cva(
  `
    inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background
    transition-colors focus-visible:outline-none cursor-pointer
    disabled:pointer-events-none disabled:opacity-50
    aria-disabled:pointer-events-none aria-disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border border-accent text-primary bg-background shadow-xs hover:bg-accent',
        secondary: 'bg-transparent text-primary border border-solid border-primary',
        orange: 'border-transparent bg-yellow-500 text-white [a&]:hover:bg-blue-600',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'text-primary-foreground hover:bg-primary bg-primary',
        'outline-destructive':
          'hover:text-destructive border border-solid border-destructive shadow-xs text-destructive hover:bg-destructive hover:text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-8 w-8 rounded-full',
        full: 'w-full h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export default function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

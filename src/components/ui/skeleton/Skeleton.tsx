import { type FC, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>;

type SkeletonComponent = FC<SkeletonProps>;

const skeletonVariants = cva('animate-pulse rounded-md', {
  variants: {
    variant: {
      default: 'bg-muted',
      card: 'bg-card',
      primary: 'bg-primary/10',
    },
    size: {
      default: 'h-6 w-full',
      sm: 'h-4',
      md: 'h-8',
      lg: 'h-16',
      icon: 'h-10 w-10',
      avatar: 'h-12 w-12 rounded-full',
      thumbnail: 'h-20 w-20 rounded-md',
      banner: 'h-32 w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Skeleton: SkeletonComponent = ({ className, variant, size, ...props }) => {
  return <div data-slot="skeleton" className={cn(skeletonVariants({ variant, size }), className)} {...props} />;
};

export default Skeleton;

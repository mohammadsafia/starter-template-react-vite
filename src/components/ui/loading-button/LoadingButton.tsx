import { Button, type ButtonProps } from '@components/ui';
import { Conditional } from '@components/shared';

import { cn } from '@utils';

import { Loader2Icon } from 'lucide-react';

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

const LoadingButton = ({ className, loading = false, disabled, children, ...props }: LoadingButtonProps) => {
  return (
    <Button className={cn(`relative`, className)} disabled={disabled ?? loading} {...props}>
      <div role="button">
        <span className={cn(loading ? 'opacity-0' : 'opacity-100', className)}>{children}</span>

        <Conditional.If condition={loading}>
          <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2Icon className="animate-spin text-inherit" size={20} aria-label="loading" />
          </div>
        </Conditional.If>
      </div>
    </Button>
  );
};

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;

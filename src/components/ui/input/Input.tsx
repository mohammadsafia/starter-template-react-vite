import { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'border-accent bg-background flex w-full rounded-md disabled:cursor-not-allowed disabled:opacity-50',
        'border px-3 py-2 text-sm shadow-xs transition-colors',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'hover:ring-accent focus-visible:ring-accent hover:ring focus-visible:ring focus-visible:outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

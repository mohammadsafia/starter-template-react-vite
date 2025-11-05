import { type ComponentProps, type RefCallback } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@utils';

import { Check } from 'lucide-react';

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  ref?: RefCallback<HTMLButtonElement>;
};

const Checkbox = ({ ref, className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    ref={(el) => ref?.(el)}
    data-slot="checkbox"
    className={cn(
      'peer border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4',
      'shrink-0 rounded-sm border shadow-sm focus-within:ring disabled:cursor-not-allowed disabled:opacity-50',
      'hover:ring-accent focus-within:ring-accent focus-within:ring focus-within:outline-none hover:ring',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={cn('flex items-center justify-center text-current')}>
      <Check size={16} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;

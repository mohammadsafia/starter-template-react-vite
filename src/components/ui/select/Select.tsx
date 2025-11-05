import { type ComponentPropsWithoutRef, type FC, type Ref } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@utils';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { ref?: Ref<HTMLButtonElement> };
type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;
type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;
type SelectGroupProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;
type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;
type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;
type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;
type SelectScrollUpButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>;
type SelectScrollDownButtonProps = ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>;
type SelectProps = typeof SelectPrimitive.Root;

type SelectComponent = SelectProps & {
  Trigger: FC<SelectTriggerProps>;
  Value: FC<SelectValueProps>;
  Group: FC<SelectGroupProps>;
  Content: FC<SelectContentProps>;
  Label: FC<SelectLabelProps>;
  Item: FC<SelectItemProps>;
  Separator: FC<SelectSeparatorProps>;
  ScrollUpButton: FC<SelectScrollUpButtonProps>;
  ScrollDownButton: FC<SelectScrollDownButtonProps>;
};

const SelectTrigger: FC<SelectTriggerProps> = ({ className, children, ...props }) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    className={cn(
      'border-accent bg-background placeholder:text-accent-foreground flex w-full cursor-pointer items-center justify-between rounded-md',
      'border px-3 py-2 text-sm shadow-xs disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      'hover:ring-accent focus-visible:ring-accent focus:ring-accent hover:ring focus:ring focus-visible:ring focus-visible:outline-none',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon data-slot="select-icon" asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectScrollUpButton: FC<SelectScrollUpButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    data-slot="select-scroll-up"
    className={cn('flex cursor-base-project items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton: FC<SelectScrollDownButtonProps> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    data-slot="select-scroll-down"
    className={cn('flex cursor-base-project items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
);

const SelectContent: FC<SelectContentProps> = ({ className, children, position = 'popper', ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      className={cn(
        `border-accent bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md`,
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        data-slot="select-viewport"
        className={cn(
          'p-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectLabel: FC<SelectLabelProps> = ({ className, ...props }) => (
  <SelectPrimitive.Label data-slot="select-label" className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
);

const SelectItem: FC<SelectItemProps> = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-base-project items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator">
        <CheckIcon size={16} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText data-slot="select-item-text">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectSeparator: FC<SelectSeparatorProps> = ({ className, ...props }) => (
  <SelectPrimitive.Separator data-slot="select-separator" className={cn('bg-primary -mx-1 my-1 h-px', className)} {...props} />
);

const SelectValue: FC<SelectValueProps> = (props) => <SelectPrimitive.Value data-slot="select-value" {...props} />;

const SelectGroup: FC<SelectGroupProps> = (props) => <SelectPrimitive.Group data-slot="select-group" {...props} />;

// Main Select Component
const Select = SelectPrimitive.Root as SelectComponent;

Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Group = SelectGroup;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
SelectContent.displayName = SelectPrimitive.Content.displayName;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
SelectItem.displayName = SelectPrimitive.Item.displayName;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export default Select;

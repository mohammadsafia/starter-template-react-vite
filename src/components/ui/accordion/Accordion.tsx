import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@utils';
import { Conditional } from '@components/shared';

type AccordionComponent = typeof AccordionPrimitive.Root & {
  Item: FC<ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>;
  Trigger: FC<
    ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
      showChevron?: boolean;
    }
  >;
  Content: FC<ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>;
};

function Item({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-accent border-b last:border-b-0', className)} {...props} />
  );
}

function Trigger({
  className,
  children,
  showChevron = true,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  showChevron?: boolean;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <Conditional.If condition={showChevron}>
          <ChevronDownIcon className="text-primary pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        </Conditional.If>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function Content({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

const Accordion = AccordionPrimitive.Root as AccordionComponent;

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;

Item.displayName = 'AccordionItem';
Trigger.displayName = AccordionPrimitive.Trigger.displayName;
Content.displayName = AccordionPrimitive.Content.displayName;

export default Accordion;

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@utils';

import { type ComponentPropsWithoutRef, type FC, type HTMLAttributes } from 'react';

type SheetTriggerProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;
type SheetPortalProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;
type SheetCloseProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;
type SheetOverlayProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>;
type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
};
type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;
type SheetFooterProps = HTMLAttributes<HTMLDivElement>;
type SheetTitleProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Description>;

type SheetProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;

type SheetComponent = FC<SheetProps> & {
  Trigger: FC<SheetTriggerProps>;
  Portal: FC<SheetPortalProps>;
  Close: FC<SheetCloseProps>;
  Overlay: FC<SheetOverlayProps>;
  Content: FC<SheetContentProps>;
  Header: FC<SheetHeaderProps>;
  Footer: FC<SheetFooterProps>;
  Title: FC<SheetTitleProps>;
  Description: FC<SheetDescriptionProps>;
};



const SheetTrigger: FC<SheetTriggerProps> = (props) => <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;

const SheetPortal: FC<SheetPortalProps> = (props) => <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;

const SheetClose: FC<SheetCloseProps> = (props) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />;

const SheetOverlay: FC<SheetOverlayProps> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay
    data-slot="sheet-overlay"
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      className,
    )}
    {...props}
  />
);

const SheetContent: FC<SheetContentProps> = ({ className, children, side = 'right', ...props }) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        side === 'right' &&
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right border-accent inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left' &&
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top' && 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        side === 'bottom' &&
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
        className,
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);

const SheetHeader: FC<SheetHeaderProps> = ({ className, ...props }) => (
  <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
);

const SheetFooter: FC<SheetFooterProps> = ({ className, ...props }) => (
  <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);

const SheetTitle: FC<SheetTitleProps> = ({ className, ...props }) => (
  <SheetPrimitive.Title data-slot="sheet-title" className={cn('text-foreground font-semibold', className)} {...props} />
);

const SheetDescription: FC<SheetDescriptionProps> = ({ className, ...props }) => (
  <SheetPrimitive.Description data-slot="sheet-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
);

const Sheet: SheetComponent = ({ ...props }) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};
Sheet.Trigger = SheetTrigger;
Sheet.Portal = SheetPortal;
Sheet.Close = SheetClose;
Sheet.Overlay = SheetOverlay;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Footer = SheetFooter;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;

SheetTrigger.displayName = SheetPrimitive.Trigger.displayName;
SheetPortal.displayName = SheetPrimitive.Portal.displayName;
SheetClose.displayName = SheetPrimitive.Close.displayName;
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
SheetContent.displayName = SheetPrimitive.Content.displayName;
SheetHeader.displayName = 'SheetHeader';
SheetFooter.displayName = 'SheetFooter';
SheetTitle.displayName = SheetPrimitive.Title.displayName;
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export default Sheet;

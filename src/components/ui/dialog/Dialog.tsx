import { type ComponentPropsWithoutRef, type FC, type HTMLAttributes } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@utils';

import { X } from 'lucide-react';

type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;
type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;
type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

type DialogComponent = FC<DialogProps> & {
  Trigger: FC<DialogTriggerProps>;
  Portal: FC<DialogPortalProps>;
  Close: FC<DialogCloseProps>;
  Overlay: FC<DialogOverlayProps>;
  Content: FC<DialogContentProps>;
  Header: FC<DialogHeaderProps>;
  Footer: FC<DialogFooterProps>;
  Title: FC<DialogTitleProps>;
  Description: FC<DialogDescriptionProps>;
};

const DialogClose: FC<DialogCloseProps> = ({ className, ...props }) => {
  return <DialogPrimitive.Close data-slot="dialog-close" className={cn(className)} {...props} />;
};

const DialogTrigger: FC<DialogTriggerProps> = ({ className, ...props }) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" className={cn(className)} {...props} />;
};

const Overlay: FC<DialogOverlayProps> = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn(
      'bg-foreground/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50',
      className,
    )}
    {...props}
  />
);

const Content: FC<DialogContentProps> = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal>
    <Overlay />

    <DialogPrimitive.Content
      data-slot="dialog-content"
      className={cn(
        `border-accent bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0`,
        'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-top',
        'fixed start-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border px-3 py-6 shadow-lg duration-200 sm:rounded-lg md:w-full md:px-6',
        className,
      )}
      {...props}
    >
      {children}

      <DialogClose
        aria-label="Close"
        className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground absolute end-4 top-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
      >
        <X size={16} />
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <header data-slot="dialog-header" className={cn('flex flex-col space-y-1.5 text-center sm:text-start', className)} {...props} />
);

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <footer data-slot="dialog-footer" className={cn('space-x-2 text-center md:text-end', className)} {...props} />
);

const Title: FC<ComponentPropsWithoutRef<typeof DialogPrimitive.Title>> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn('text-lg leading-none font-semibold tracking-tight', className)}
    {...props}
  />
);

const Description: FC<ComponentPropsWithoutRef<typeof DialogPrimitive.Description>> = ({ className, ...props }) => (
  <DialogPrimitive.Description data-slot="dialog-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
);

const Dialog: DialogComponent = ({ ...props }) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

Dialog.Portal = DialogPrimitive.Portal;
Dialog.Overlay = Overlay;
Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogClose;
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;
Dialog.Title = Title;
Dialog.Description = Description;

Overlay.displayName = DialogPrimitive.Overlay.displayName;
Content.displayName = DialogPrimitive.Content.displayName;
Title.displayName = DialogPrimitive.Title.displayName;
Description.displayName = DialogPrimitive.Description.displayName;
Header.displayName = 'DialogHeader';
Footer.displayName = 'DialogFooter';

export default Dialog;

import { type ComponentPropsWithoutRef, type FC } from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

import { X } from 'lucide-react';

type ToastActionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;
type ToastCloseProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Close>;
type ToastTitleProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Title>;
type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Description>;
type ToastViewportProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>;
export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>;

type ToastComponent = FC<ToastProps> & {
  Provider: typeof ToastPrimitives.Provider;
  Viewport: FC<ToastViewportProps>;
  Action: FC<ToastActionProps>;
  Close: FC<ToastCloseProps>;
  Title: FC<ToastTitleProps>;
  Description: FC<ToastDescriptionProps>;
};

const toastVariants = cva(
  `
    group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden
    rounded-md border border-primary p-6 pe-8 shadow-lg transition-all
    data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
    data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out
    data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full
    data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full
  `,
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'success group border-success bg-success text-success-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const ToastViewport = ({ className, ...props }: ToastViewportProps) => (
  <ToastPrimitives.Viewport
    data-slot="toast-viewport"
    className={cn(
      'fixed top-0 z-[100] flex max-h-[12vh] justify-center text-center w-full flex-col-reverse p-4 sm:start-[43vw] sm:end-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
      className,
    )}
    {...props}
  />
);

const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <ToastPrimitives.Action
    data-slot="toast-action"
    className={cn(
      `bg-secondary group-[.destructive]:border-primary/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50`,
      className,
    )}
    {...props}
  />
);

const ToastClose = ({ className, ...props }: ToastCloseProps) => (
  <ToastPrimitives.Close
    aria-label="Close"
    data-slot="toast-close"
    className={cn(
      `text-foreground/50 hover:text-foreground group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground absolute end-2 top-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none`,
      className,
    )}
    toast-close=""
    {...props}
  >
    <X size={16} />
  </ToastPrimitives.Close>
);

const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <ToastPrimitives.Title data-slot="toast-title" className={cn('text-sm font-semibold', className)} {...props} />
);

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => (
  <ToastPrimitives.Description data-slot="toast-description" className={cn('text-sm opacity-90', className)} {...props} />
);

const Toast: ToastComponent = ({ className, variant, ...props }: ToastProps) => {
  return <ToastPrimitives.Root data-slot="toast" className={cn(toastVariants({ variant }), className)} {...props} />;
};

Toast.Provider = ToastPrimitives.Provider;
Toast.Viewport = ToastViewport;
Toast.Action = ToastAction;
Toast.Close = ToastClose;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;

Toast.displayName = ToastPrimitives.Root.displayName;
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
ToastAction.displayName = ToastPrimitives.Action.displayName;
ToastClose.displayName = ToastPrimitives.Close.displayName;
ToastTitle.displayName = ToastPrimitives.Title.displayName;
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export default Toast;

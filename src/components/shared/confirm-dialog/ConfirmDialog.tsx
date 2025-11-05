import { Conditional } from '@components/shared';
import { type ButtonVariants, Dialog, LoadingButton } from '@components/ui';
import { cn } from '@utils';
import { type ReactNode, useState } from 'react';

type ConfirmDialogProps = ButtonVariants & {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  onConfirm?: (reason?: string) => void | Promise<unknown>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  reasonInput?: boolean;
};

function ConfirmDialog({
  title,
  description,
  children,
  action,
  variant = 'default',
  className,
  onConfirm,
  open: externalOpen,
  onOpenChange,
  reasonInput,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState<string>();

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setLoading(true);
    try {
      const result = onConfirm(reason);
      if (result && typeof (result as Promise<void>).then === 'function') {
        await result;
      }
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}

      <Dialog.Content className={cn(className)}>
        <Conditional.If condition={!!title}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Conditional.If condition={!!description}>
              <Dialog.Description>{description}</Dialog.Description>
            </Conditional.If>
            <Conditional.If condition={!!reasonInput}>
              <div className="relative mt-4">
                <textarea
                  className={cn(
                    'border-accent bg-background ring-offset-background focus-visible:ring-accent hover:ring-accent flex min-h-[80px] w-full',
                    'resize-none rounded-md border px-3 py-2 text-sm shadow-xs transition-colors hover:ring focus-visible:ring',
                    'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                  )}
                  value={reason}
                  placeholder="Reason"
                  onChange={(ev) => setReason(ev.target.value)}
                />
              </div>
            </Conditional.If>
          </Dialog.Header>
        </Conditional.If>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <LoadingButton variant="outline" disabled={loading}>
              Cancel
            </LoadingButton>
          </Dialog.Close>
          <Conditional.If condition={!action}>
            <LoadingButton variant={variant} onClick={handleConfirm} loading={loading} disabled={loading}>
              Confirm
            </LoadingButton>
          </Conditional.If>

          <Conditional.If condition={!!action}>{action}</Conditional.If>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

export default ConfirmDialog;

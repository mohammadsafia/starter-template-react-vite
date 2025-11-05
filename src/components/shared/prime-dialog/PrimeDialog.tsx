import { type ComponentProps, createContext, type FC, useContext, useEffect, useState } from 'react';
import { Dialog, LoadingButton, type LoadingButtonProps } from '@components/ui';
import { Conditional } from '@components/shared';

import { cn } from '@utils';

type DialogBaseProps = {
  open?: boolean;
  isLoading?: boolean;
  dialogMode?: 'Create' | 'Update' | 'View' | boolean;
};

type TriggerProps = ComponentProps<typeof Dialog.Trigger>;

type ContainerProps = ComponentProps<typeof Dialog.Content>;

type HeaderProps = ComponentProps<typeof Dialog.Header>;

type TitleProps = ComponentProps<typeof Dialog.Title> & DialogBaseProps;

type DescriptionProps = ComponentProps<typeof Dialog.Description>;

type ContentProps = ComponentProps<typeof Dialog.Content>;

type ActionsProps = ComponentProps<typeof Dialog.Footer> &
  DialogBaseProps & {
    primaryButtonProps?: Omit<LoadingButtonProps, 'loading'>;
    secondaryButtonProps?: Omit<LoadingButtonProps, 'loading'>;
    disabled?: boolean;
  };

type PrimeDialogProps = Omit<ComponentProps<typeof Dialog>, 'onOpenChange'> &
  DialogBaseProps & {
    closeOnSuccess?: boolean;
    onOpenChange?(open: boolean): void;
  };

type PrimeDialogComponent = FC<PrimeDialogProps> & {
  Trigger: FC<TriggerProps>;
  Container: FC<ContainerProps>;
  Header: FC<HeaderProps>;
  Title: FC<TitleProps>;
  Description: FC<DescriptionProps>;
  Content: FC<ContentProps>;
  Actions: FC<ActionsProps>;
};

const getDialogModeText = (dialogMode?: PrimeDialogProps['dialogMode']): string => {
  if (dialogMode === undefined) return '';

  if (typeof dialogMode === 'boolean') return dialogMode ? 'Edit' : 'Add';

  return dialogMode ?? 'Add';
};

const PrimeDialogContext = createContext<PrimeDialogProps>({});

const Trigger: FC<TriggerProps> = ({ children, ...props }) => (
  <Dialog.Trigger asChild {...props}>
    {children}
  </Dialog.Trigger>
);

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
  <Dialog.Content className={cn('px-0 py-0 md:max-w-[800px] md:px-0 md:py-0', className)} {...props}>
    {children}
  </Dialog.Content>
);

const Header: FC<HeaderProps> = ({ children, className, ...props }) => (
  <Dialog.Header className={cn('bg-primary/5 border-primary/20 border-b px-6 py-4', className)} {...props}>
    {children}
  </Dialog.Header>
);

const Title: FC<TitleProps> = ({ children, className, dialogMode, ...props }) => {
  const context = useContext(PrimeDialogContext);

  return (
    <Dialog.Title className={cn('', className)} {...props}>
      {dialogMode ?? getDialogModeText(context.dialogMode)} {children}
    </Dialog.Title>
  );
};

const Content: FC<ContentProps> = ({ children, className, ...props }) => (
  <section className={cn('px-3 py-0 md:px-6 md:py-0', className)} {...props}>
    {children}
  </section>
);

const Actions: FC<ActionsProps> = ({
  children,
  isLoading,
  disabled,
  dialogMode,
  primaryButtonProps,
  secondaryButtonProps,
  className,
  ...props
}) => {
  const context = useContext(PrimeDialogContext);

  return (
    <Dialog.Footer className={cn('mt-6 flex justify-end px-6 pb-6', className)} {...props}>
      <Conditional>
        <Conditional.If condition={!!children}>{children}</Conditional.If>

        <Conditional.Else>
          <Dialog.Close asChild>
            <LoadingButton type="reset" variant="outline" className={cn('grow', secondaryButtonProps?.className)} {...secondaryButtonProps}>
              {secondaryButtonProps?.children || 'Cancel'}
            </LoadingButton>
          </Dialog.Close>

          <LoadingButton
            type="submit"
            loading={isLoading ?? context.isLoading}
            disabled={disabled}
            className={cn('grow', context.dialogMode === 'View' && 'hidden', primaryButtonProps?.className)}
            {...primaryButtonProps}
          >
            {primaryButtonProps?.children || (dialogMode ?? (getDialogModeText(context.dialogMode) || 'Create'))}
          </LoadingButton>
        </Conditional.Else>
      </Conditional>
    </Dialog.Footer>
  );
};

const PrimeDialog: PrimeDialogComponent = ({ open, onOpenChange, closeOnSuccess, dialogMode, children, ...props }) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false);

  const onInternalOpenChange = (open: boolean) => {
    setInternalOpen((prevState) => !prevState);

    onOpenChange?.(!open);
  };

  useEffect(() => {
    if (closeOnSuccess) setInternalOpen(false);
  }, [closeOnSuccess]);

  return (
    <PrimeDialogContext.Provider value={{ open: internalOpen, onOpenChange: onInternalOpenChange, dialogMode, ...props }}>
      <Dialog open={internalOpen} onOpenChange={onInternalOpenChange} {...props}>
        {children}
      </Dialog>
    </PrimeDialogContext.Provider>
  );
};

PrimeDialog.Trigger = Trigger;
PrimeDialog.Container = Container;
PrimeDialog.Header = Header;
PrimeDialog.Title = Title;
PrimeDialog.Description = Dialog.Description;
PrimeDialog.Content = Content;
PrimeDialog.Actions = Actions;

export default PrimeDialog;

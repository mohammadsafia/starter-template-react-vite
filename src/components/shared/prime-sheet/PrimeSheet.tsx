import { type ComponentProps, createContext, type FC, useContext, useEffect, useState } from 'react';
import { Sheet, LoadingButton, type LoadingButtonProps } from '@components/ui';
import { Conditional } from '@components/shared';

import { cn } from '@utils';

type SheetBaseProps = {
  open?: boolean;
  isLoading?: boolean;
  sheetMode?: 'Create' | 'Update' | 'View' | boolean;
};

type TriggerProps = ComponentProps<typeof Sheet.Trigger>;
type ContainerProps = ComponentProps<typeof Sheet.Content>;
type HeaderProps = ComponentProps<typeof Sheet.Header>;
type TitleProps = ComponentProps<typeof Sheet.Title> & SheetBaseProps;
type DescriptionProps = ComponentProps<typeof Sheet.Description>;
type ContentProps = ComponentProps<typeof Sheet.Content>;
type ActionsProps = ComponentProps<typeof Sheet.Footer> &
  SheetBaseProps & {
    primaryButtonProps?: Omit<LoadingButtonProps, 'loading'>;
    secondaryButtonProps?: Omit<LoadingButtonProps, 'loading'>;
  };

type PrimeSheetProps = Omit<ComponentProps<typeof Sheet>, 'onOpenChange'> &
  SheetBaseProps & {
    closeOnSuccess?: boolean;
    onOpenChange?(open: boolean): void;
  };

type PrimeSheetComponent = FC<PrimeSheetProps> & {
  Trigger: FC<TriggerProps>;
  Container: FC<ContainerProps>;
  Header: FC<HeaderProps>;
  Title: FC<TitleProps>;
  Description: FC<DescriptionProps>;
  Content: FC<ContentProps>;
  Actions: FC<ActionsProps>;
};

const getSheetModeText = (sheetMode?: PrimeSheetProps['sheetMode']): string => {
  if (sheetMode === undefined) return '';
  if (typeof sheetMode === 'boolean') return sheetMode ? 'Edit' : 'Add';
  return sheetMode ?? 'Add';
};

const PrimeSheetContext = createContext<PrimeSheetProps>({});

const Trigger: FC<TriggerProps> = ({ children, ...props }) => (
  <Sheet.Trigger asChild {...props}>
    {children}
  </Sheet.Trigger>
);

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <Sheet.Content className={cn('px-0 py-0 md:max-w-[800px] md:px-0 md:py-0', className)} {...props}>
      {children}
    </Sheet.Content>
  );
};

const Header: FC<HeaderProps> = ({ children, className, ...props }) => (
  <Sheet.Header className={cn('bg-primary/5 border-primary/20 border-b px-6 py-4', className)} {...props}>
    {children}
  </Sheet.Header>
);

const Title: FC<TitleProps> = ({ children, className, sheetMode, ...props }) => {
  const context = useContext(PrimeSheetContext);
  return (
    <Sheet.Title className={cn('', className)} {...props}>
      {sheetMode ?? getSheetModeText(context.sheetMode)} {children}
    </Sheet.Title>
  );
};

const Content: FC<ContentProps> = ({ children, className, ...props }) => (
  <section className={cn('px-3 py-0 md:px-6 md:py-0', className)} {...props}>
    {children}
  </section>
);

const Actions: FC<ActionsProps> = ({ children, isLoading, sheetMode, primaryButtonProps, secondaryButtonProps, className, ...props }) => {
  const context = useContext(PrimeSheetContext);
  return (
    <Sheet.Footer className={cn('mt-6 flex justify-end px-6 pb-6 md:flex-row', className)} {...props}>
      <Conditional>
        <Conditional.If condition={!!children}>{children}</Conditional.If>
        <Conditional.Else>
          <Sheet.Close asChild>
            <LoadingButton type="reset" variant="outline" className={cn('grow', secondaryButtonProps?.className)} {...secondaryButtonProps}>
              {secondaryButtonProps?.children || 'Cancel'}
            </LoadingButton>
          </Sheet.Close>
          <LoadingButton
            type="submit"
            loading={isLoading ?? context.isLoading}
            className={cn('grow', context.sheetMode === 'View' && 'hidden', primaryButtonProps?.className)}
            {...primaryButtonProps}
          >
            {primaryButtonProps?.children || (sheetMode ?? (getSheetModeText(context.sheetMode) || 'Create'))}
          </LoadingButton>
        </Conditional.Else>
      </Conditional>
    </Sheet.Footer>
  );
};

const PrimeSheet: PrimeSheetComponent = ({ open, onOpenChange, closeOnSuccess, sheetMode, children, ...props }) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false);

  const onInternalOpenChange = (open: boolean) => {
    setInternalOpen((prevState) => !prevState);
    onOpenChange?.(!open);
  };

  useEffect(() => {
    if (closeOnSuccess) setInternalOpen(false);
  }, [closeOnSuccess]);

  return (
    <PrimeSheetContext.Provider
      value={{
        open: internalOpen,
        onOpenChange: onInternalOpenChange,
        sheetMode,
        ...props,
      }}
    >
      <Sheet open={internalOpen} onOpenChange={onInternalOpenChange} {...props}>
        {children}
      </Sheet>
    </PrimeSheetContext.Provider>
  );
};

PrimeSheet.Trigger = Trigger;
PrimeSheet.Container = Container;
PrimeSheet.Header = Header;
PrimeSheet.Title = Title;
PrimeSheet.Description = Sheet.Description;
PrimeSheet.Content = Content;
PrimeSheet.Actions = Actions;

export default PrimeSheet;

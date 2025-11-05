import type { ComponentProps, FC, ReactNode } from 'react';
import { TooltipButton, type TooltipButtonProps } from '@components/ui';

import { cn } from '@utils';

type ActionPanelHeaderProps = ComponentProps<'p'>;

type ActionPanelActionsProps = ComponentProps<'div'>;

type ActionPanelActionProps = TooltipButtonProps & {
  icon?: ReactNode;
};

type ActionPanelProps = ComponentProps<'div'> & {};

type ActionPanelComponent = FC<ActionPanelProps> & {
  Header: FC<ActionPanelHeaderProps>;
  Actions: FC<ActionPanelActionsProps>;
  Action: FC<ActionPanelActionProps>;
};

const ActionPanelHeader: FC<ActionPanelHeaderProps> = ({ className, children, ...props }) => {
  return (
    <p className={cn('text-accent-foreground flex items-center gap-2 text-xl', className)} {...props}>
      {children}
    </p>
  );
};

const ActionPanelActions: FC<ActionPanelActionsProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
};

const ActionPanelAction: FC<ActionPanelActionProps> = ({ className, icon, children, ...props }) => {
  return (
    <TooltipButton className={cn('flex items-center gap-2', className)} {...props}>
      {icon} {children}
    </TooltipButton>
  );
};

const ActionPanel: ActionPanelComponent = ({ className, children, ...props }) => {
  return (
    <div className={cn('my-4 flex justify-between', className)} {...props}>
      {children}
    </div>
  );
};

ActionPanel.Header = ActionPanelHeader;
ActionPanel.Actions = ActionPanelActions;
ActionPanel.Action = ActionPanelAction;

export default ActionPanel;

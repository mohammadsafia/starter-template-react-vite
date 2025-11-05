import { Children, type ComponentProps, type FC, isValidElement, type ReactNode } from 'react';
import { Card } from '@components/ui';
import { Conditional } from '@components/shared';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

type PrimeCardTitleProps = ComponentProps<typeof Card.Title>;

type PrimeCardHeaderProps = ComponentProps<typeof Card.Header>;

type PrimeCardContentProps = ComponentProps<typeof Card.Content>;

type PrimeCardProps = ComponentProps<typeof Card> &
  VariantProps<typeof primeCardVariants> & {
    title?: ReactNode;
    icon?: ReactNode;
    children: ReactNode | ReactNode[];
  };

type CardComponent = FC<PrimeCardProps> & {
  Title: FC<PrimeCardTitleProps>;
  Header: FC<PrimeCardHeaderProps>;
  Content: FC<PrimeCardContentProps>;
};

const primeCardVariants = cva('', {
  variants: {
    variant: {
      default: '',
      primary: 'bg-primary/5 border-primary/20',
      secondary: 'bg-secondary/1 border-secondary/20',
      success: 'bg-success/5 border-success/20 shadow-sm',
      danger: 'bg-destructive/5 border-destructive/20 shadow-sm',
      warning: 'bg-warning/5 border-warning/20 shadow-sm',
      info: 'bg-info/5 border-info/20 shadow-sm',
      outline: 'border-2 border-primary/20 bg-transparent shadow-none hover:bg-primary/5 transition-colors',
      'outline-secondary': 'border-2 border-secondary/20 bg-transparent shadow-none hover:bg-secondary/5 transition-colors',
      flat: 'shadow-none border-none bg-primary/10 hover:bg-primary/20 transition-colors',
      elevated: 'shadow-md border-none hover:shadow-lg transition-shadow',
      'elevated-lg': 'shadow-lg border-none hover:shadow-xl transition-shadow',
      'elevated-xl': 'shadow-xl border-none hover:shadow-2xl transition-shadow',
      glass: 'backdrop-blur-sm bg-background/10 border-background/20 shadow-lg',
      gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const PrimeCardTitle: FC<PrimeCardHeaderProps> = ({ children, className, ...props }) => (
  <Card.Title className={cn('flex items-center gap-3 text-xl', className)} {...props}>
    {children}
  </Card.Title>
);

const PrimeCardHeader: FC<PrimeCardHeaderProps> = ({ children, className, ...props }) => (
  <Card.Header className={cn('bg-primary/5 border-primary/20 border-b py-4', className)} {...props}>
    {children}
  </Card.Header>
);

const PrimeCardContent: FC<PrimeCardContentProps> = ({ children, className, ...props }) => (
  <Card.Content className={cn('mt-3', className)} {...props}>
    {children}
  </Card.Content>
);

const PrimeCard: CardComponent = ({ className, variant, title, icon, children, ...props }) => {
  const childArray = Children.toArray(children);

  const headerChild = childArray.find((child) => isValidElement(child) && child.type === PrimeCardHeader);

  const contentChild = childArray.find((child) => isValidElement(child) && child.type === PrimeCardContent);

  const otherChildren = childArray.filter(
    (child) => !(isValidElement(child) && (child.type === PrimeCardHeader || child.type === PrimeCardContent)),
  );

  return (
    <Card className={cn(primeCardVariants({ variant }), className)} {...props}>
      <Conditional>
        <Conditional.If condition={!!headerChild}>{headerChild}</Conditional.If>

        <Conditional.Else>
          <PrimeCardHeader>
            <PrimeCardTitle>
              <Conditional.If condition={!!icon}>
                <span className="text-secondary">{icon}</span>
              </Conditional.If>

              {title}
            </PrimeCardTitle>
          </PrimeCardHeader>
        </Conditional.Else>
      </Conditional>

      <Conditional>
        <Conditional.If condition={!!contentChild}>{contentChild}</Conditional.If>

        <Conditional.Else>
          <PrimeCardContent>{otherChildren}</PrimeCardContent>
        </Conditional.Else>
      </Conditional>
    </Card>
  );
};

PrimeCard.Title = PrimeCardTitle;
PrimeCard.Header = PrimeCardHeader;
PrimeCard.Content = PrimeCardContent;

export default PrimeCard;

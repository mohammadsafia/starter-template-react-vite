import { type ComponentProps, type FC, type ReactNode } from 'react';
import { Card, Skeleton } from '@components/ui';
import { Conditional } from '@components/shared';

import { cn } from '@utils';

type MetaCardProps = ComponentProps<typeof Card> & {
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  isLoading?: boolean;
  imageURL?: string;
};

type CardComponent = FC<MetaCardProps> & {};

const MetaCardLoader = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-4 w-20" />

      <Skeleton className="h-6 w-1/2" />
    </div>
  );
};

const MetaCard: CardComponent = ({ className, title, subtitle, description, imageURL, isLoading, children, ...props }) => {
  if (isLoading) return <MetaCardLoader />;

  return (
    <Card className={cn('flex flex-col gap-1 border-none p-0 shadow-none', className)} {...props}>
      <Card.Header className="p-0 md:p-0">
        <Card.Title className="mb-0 text-sm font-normal">{title}</Card.Title>

        <Card.Description>{subtitle}</Card.Description>
      </Card.Header>

      <Card.Content className="p-0 text-sm font-medium md:p-0">
        <Conditional>
          <Conditional.If condition={!!imageURL}>
            <img className="block object-contain" src={imageURL} alt={title} />
          </Conditional.If>

          <Conditional.If condition={!!description}>{description}</Conditional.If>

          <Conditional.If condition={!!children}>{children}</Conditional.If>

          <Conditional.Else>-</Conditional.Else>
        </Conditional>
      </Card.Content>
    </Card>
  );
};

export default MetaCard;

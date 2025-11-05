import { type FC, type HTMLAttributes } from 'react';
import { cn } from '@utils';

type CardComponent = FC<HTMLAttributes<HTMLDivElement>> & {
  Header: FC<HTMLAttributes<HTMLDivElement>>;
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Description: FC<HTMLAttributes<HTMLParagraphElement>>;
  Content: FC<HTMLAttributes<HTMLDivElement>>;
  Footer: FC<HTMLAttributes<HTMLDivElement>>;
};

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <header data-slot="card-header" className={cn('flex flex-col space-y-1.5 px-3 py-6 md:px-6', className)} {...props} />
);

const Title: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 data-slot="card-title" className={cn('text-2xl leading-none font-semibold tracking-tight', className)} {...props} />
);

const Description: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p data-slot="card-description" className={cn('text-primary text-sm', className)} {...props} />
);

const Content: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <section data-slot="card-content" className={cn('px-3 pb-6 md:px-6', className)} {...props} />
);

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <footer data-slot="card-footer" className={cn('flex items-center px-3 pb-6 md:px-6', className)} {...props} />
);

const Card: CardComponent = ({ className, ...props }) => (
  <div data-slot="card" className={cn('border-accent bg-background text-foreground rounded-lg border shadow-sm', className)} {...props} />
);

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
Card.Footer = Footer;

export default Card;

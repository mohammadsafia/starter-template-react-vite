import { type ComponentPropsWithoutRef, type FC, type ReactElement } from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@utils';

type ImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

type FallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  children: Array<ReactElement<ImageProps, FC<ImageProps>> | ReactElement<FallbackProps, FC<FallbackProps>>>;
};

type AvatarComponent = FC<AvatarProps> & {
  Image: FC<ImageProps>;
  Fallback: FC<FallbackProps>;
};

const Image: FC<ImageProps> = ({ className, ...props }) => (
  <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />
);

const Fallback: FC<FallbackProps> = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    data-slot="avatar-fallback"
    className={cn('flex size-full items-center justify-center rounded-full', className)}
    {...props}
  />
);

const Avatar: AvatarComponent = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    className={cn('border-primary relative flex size-8 shrink-0 overflow-hidden rounded-full border', className)}
    {...props}
  />
);

Avatar.Image = Image;
Avatar.Fallback = Fallback;

export default Avatar;

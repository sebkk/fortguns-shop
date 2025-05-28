import clsx from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import NextLink from 'next/link';

import { ILinkProps } from './types';

export const Link = ({
  href,
  children,
  className,
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  anchorProps = {},
  nextLinkProps = {},
}: ILinkProps) => {
  const variantClasses = {
    primary:
      'hover:text-primary hover:underline focus:text-primary-light active:text-primary-light',
    secondary:
      'hover:text-secondary hover:underline focus:text-secondary-light active:text-secondary-light',
    accent:
      'hover:text-accent hover:underline focus:text-accent-light active:text-accent-light',
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const baseClasses =
    'inline-flex items-center justify-center transition duration-300 ease-in-out';

  const classNames = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  return (
    <NextLink
      href={href as Url}
      className={classNames}
      {...anchorProps}
      {...nextLinkProps}
    >
      {leadingIcon && (
        <span className='mr-1 inline-flex items-center'>{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className='ml-1 inline-flex items-center'>{trailingIcon}</span>
      )}
    </NextLink>
  );
};

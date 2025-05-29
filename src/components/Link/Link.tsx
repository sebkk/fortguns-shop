'use client';

import clsx from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import NextLink from 'next/link';

import styles from './styles.module.scss';
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
  const variantClassMap = {
    primary: styles['link-primary'],
    secondary: styles['link-secondary'],
    accent: styles['link-accent'],
  };

  const sizeClassMap = {
    small: styles['link-size--small'],
    medium: styles['link-size--medium'],
    large: styles['link-size--large'],
  };

  const classNames = clsx(
    styles['link-base'],
    variantClassMap[variant],
    sizeClassMap[size],
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
        <span className={styles['leading-icon-wrapper']}>{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className={styles['trailing-icon-wrapper']}>{trailingIcon}</span>
      )}
    </NextLink>
  );
};

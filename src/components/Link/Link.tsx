'use client';

import clsx from 'clsx';

import { Link as NextLink } from '@/i18n/navigation';

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
  shouldFillIcon = false,
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
    shouldFillIcon && styles['link-should-fill-icon'],
    className,
  );
  return (
    <NextLink
      href={href}
      className={classNames}
      {...nextLinkProps}
      {...anchorProps}
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

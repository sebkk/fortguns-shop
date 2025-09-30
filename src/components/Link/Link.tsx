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
  nativeLink = false,
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
    xLarge: styles['link-size--x-large'],
    xxLarge: styles['link-size--xx-large'],
  };

  const classNames = clsx(
    styles['link-base'],
    variantClassMap[variant],
    sizeClassMap[size],
    shouldFillIcon && styles['link-should-fill-icon'],
    className,
  );

  const isExternal = (url: string) => {
    try {
      const urlObj = new URL(url);

      return (
        urlObj.protocol.startsWith('http') &&
        urlObj.host !== window.location.host
      );
    } catch {
      return false;
    }
  };

  const isExternalLink = isExternal(href as string);

  if (isExternalLink || nativeLink) {
    return (
      <a
        href={href as string}
        className={classNames}
        target='_blank'
        rel='noopener'
        {...anchorProps}
      >
        {leadingIcon && (
          <span className={styles['leading-icon-wrapper']}>{leadingIcon}</span>
        )}
        {children}
        {trailingIcon && (
          <span className={styles['trailing-icon-wrapper']}>
            {trailingIcon}
          </span>
        )}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = {
    ...(nextLinkProps as any), // eslint-disable-line @typescript-eslint/no-explicit-any
    ...(anchorProps as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  return (
    <NextLink href={href} className={classNames} {...props}>
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

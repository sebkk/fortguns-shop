import React from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  isRounded?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withBackground?: boolean;
  variant?: 'primary' | 'secondary';
  tag?: keyof React.JSX.IntrinsicElements;
  /** Passed through to the rendered element, e.g. listbox option semantics. */
  elementProps?: React.HTMLAttributes<HTMLElement> & { id?: string };
}

export const Card = ({
  children,
  className,
  isRounded,
  withShadow,
  withBorder,
  withBackground,
  variant = 'primary',
  tag = 'div',
  elementProps,
}: ICardProps) => {
  const Tag = tag as React.ElementType;

  const classNames = clsx(
    styles['card'],
    isRounded && styles['card--rounded'],
    withShadow && styles['card--with-shadow'],
    withBorder && styles[`card-v--${variant}--with-border`],
    withBackground && styles[`card-v--${variant}--with-background`],
    variant && styles[`card-v--${variant}`],
    className,
  );

  return (
    <Tag className={classNames} {...elementProps}>
      {children}
    </Tag>
  );
};

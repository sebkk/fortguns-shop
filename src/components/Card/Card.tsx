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
}: ICardProps) => {
  const Tag = tag;

  const classNames = clsx(
    styles['card'],
    isRounded && styles['card--rounded'],
    withShadow && styles['card--with-shadow'],
    withBorder && styles[`card-v--${variant}--with-border`],
    withBackground && styles[`card-v--${variant}--with-background`],
    variant && styles[`card-v--${variant}`],
    className,
  );

  return <Tag className={classNames}>{children}</Tag>;
};

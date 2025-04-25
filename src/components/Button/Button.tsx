'use client';

import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { insertTransition } from '@/helpers/tailwind/transition';

import { buttonVariants, insertButtonSize } from './helpers';
import { TButtonColor, TButtonSize, TButtonVariant } from './types';

interface IButtonProps {
  children: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  variant?: TButtonVariant;
  color?: TButtonColor;
  size?: TButtonSize;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type,
  className,
  buttonProps = {},
  disabled,
  size = 'medium',
  variant = 'filled',
  color = 'primary',
}: IButtonProps) => {
  const buttonClassNames = clsx(
    'rounded',
    insertTransition('transition-background', 'D300'),
    insertButtonSize(size),
    buttonVariants[`${variant}-${color}`],
    className && className,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;

    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClassNames}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

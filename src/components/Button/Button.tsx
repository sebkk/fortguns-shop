'use client';

import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';
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
  const sizeMap: { [key in TButtonSize]: string } = {
    large: styles['button-size--large'],
    medium: styles['button-size--medium'],
    small: styles['button-size--small'],
  };

  const variantColorMap: { [key: string]: string } = {
    'filled-primary': styles['button-filled-primary'],
    'filled-secondary': styles['button-filled-secondary'],
    'outlined-primary': styles['button-outlined-primary'],
    'outlined-secondary': styles['button-outlined-secondary'],
    'blank-primary': styles['button-blank-primary'],
    'blank-secondary': styles['button-blank-secondary'],
  };

  const buttonClassNames = clsx(
    styles['button-base'],
    sizeMap[size],
    variantColorMap[`${variant}-${color}`],
    disabled && styles.disabled, // Opcjonalna globalna klasa dla :disabled, jeśli potrzebna
    className,
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

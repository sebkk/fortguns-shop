'use client';
import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  variant?: 'filled' | 'outlined' | 'blank';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type,
  className,
  buttonProps = {},
  // variant = 'filled',
  disabled,
}: IButtonProps) => {
  const buttonClassNames = classNames(
    'px-4 py-3 text-2xl rounded',
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

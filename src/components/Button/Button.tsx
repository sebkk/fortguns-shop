'use client';
import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type,
  className,
  buttonProps = {},
}: IButtonProps) => {
  const buttonClassNames = classNames('btn bg-white', className && className);

  return (
    <button
      type={type}
      onClick={(e) => onClick && onClick(e)}
      className={buttonClassNames}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

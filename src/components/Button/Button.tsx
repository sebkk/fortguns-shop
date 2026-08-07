'use client';

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import clsx from 'clsx';

import { Spinner } from '@/components/Spinner';
import { Link } from '@/i18n/navigation';

import styles from './styles.module.scss';
import { TButtonColor, TButtonSize, TButtonVariant } from './types';

interface IButtonProps {
  children: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  variant?: TButtonVariant;
  color?: TButtonColor;
  size?: TButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  /**
   * Renderuje odnośnik zamiast przycisku, z tym samym wyglądem. Dla wszystkiego,
   * co przenosi na inny adres — link zostaje w HTML-u dla wyszukiwarek, otwiera
   * się w nowej karcie i działa z klawiatury, czego onClick nie daje.
   */
  href?: string;
  // `popover` odpada — React typuje je szerzej, niż przyjmuje Link z next-intl.
  anchorProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'popover'>;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  className,
  buttonProps = {},
  disabled,
  size = 'medium',
  variant = 'filled',
  color = 'primary',
  isLoading,
  href,
  anchorProps = {},
}: IButtonProps) => {
  const sizeMap: { [_key in TButtonSize]: string } = {
    large: styles['button-size--large'],
    medium: styles['button-size--medium'],
    small: styles['button-size--small'],
  };

  const variantColorMap: { [key: string]: string } = {
    'filled-primary': styles['button-filled-primary'],
    'outlined-primary': styles['button-outlined-primary'],
    'blank-primary': styles['button-blank-primary'],
  };

  const buttonClassNames = clsx(
    styles['button-base'],
    sizeMap[size],
    variantColorMap[`${variant}-${color}`],
    disabled && styles.disabled,
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  const content = (
    <>
      {children}
      {isLoading && <Spinner className={styles['button-loading-spinner']} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassNames} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClassNames}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

'use client';

import React from 'react';

import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss'; // Importujemy moduł SCSS

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  wrapperClassName?: string;
}

export const Input = ({
  label,
  id,
  register,
  error,
  className,
  wrapperClassName,
  ...rest
}: InputProps) => {
  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      {label && (
        <label htmlFor={id} className={styles['input-label']}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...register(id)}
        className={clsx(
          styles['input-field'],
          error && styles['input-field-error'],
          className,
        )}
        {...rest}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

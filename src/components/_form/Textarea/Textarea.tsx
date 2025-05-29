'use client';

import clsx from 'clsx';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

interface TextareaProps {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rows?: number;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  className?: string;
}

export const Textarea = ({
  label,
  id,
  register,
  error,
  className,
  rows = 4,
  textareaProps = {},
}: TextareaProps) => {
  return (
    <div className={styles['textarea-wrapper']}>
      <label htmlFor={id} className={styles['textarea-label']}>
        {label}
      </label>
      <textarea
        id={id}
        {...register(id)}
        rows={rows}
        className={clsx(
          styles['textarea-field'],
          error && styles['textarea-field-error'],
          className,
        )}
        {...textareaProps}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

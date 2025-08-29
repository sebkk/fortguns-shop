'use client';

import React from 'react';

import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

import { Label } from '@/components/_form/Label';

import styles from './Select.module.scss';

interface SelectProps {
  label?: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  wrapperClassName?: string;
  placeholder?: string;
  labelClassName?: string;
}

export const Select = ({
  label,
  id,
  register,
  error,
  options,
  className,
  selectProps = {},
  wrapperClassName,
  placeholder,
  labelClassName,
}: SelectProps) => {
  const finalWrapperClassName = clsx(
    styles['select-wrapper'],
    wrapperClassName,
  );

  return (
    <div className={finalWrapperClassName}>
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}
      <select
        id={id}
        {...(register ? register(id) : {})}
        className={clsx(
          styles['select-element'],
          error && styles['select-element-error'],
          className,
        )}
        {...selectProps}
      >
        {placeholder && (
          <option value={placeholder} disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

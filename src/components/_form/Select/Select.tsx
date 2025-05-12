import clsx from 'clsx';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface SelectProps {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

export const Select = ({
  label,
  id,
  register,
  error,
  options,
  className,
  selectProps = {},
}: SelectProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='mb-1 block text-sm font-medium text-white'>
        {label}
      </label>
      <select
        id={id}
        {...register(id)}
        className={clsx(
          'block w-full rounded-md border border-accent bg-background px-3 py-[10px] text-white shadow-sm sm:text-sm',
          'focus:border-primary focus:outline-none focus:ring-primary',
          'hover:border-primary-light',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className='mt-1 text-sm text-error'>{error}</p>}{' '}
    </div>
  );
};

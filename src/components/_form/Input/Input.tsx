import clsx from 'clsx';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
}

export const Input = ({
  label,
  id,
  register,
  error,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='mb-1 block text-sm font-medium text-white'>
        {label}
      </label>
      <input
        id={id}
        {...register(id)}
        className={clsx(
          'block w-full rounded-md border border-accent bg-background px-4 py-[10px] text-white shadow-sm sm:text-sm',
          'focus:border-primary focus:outline-none focus:ring-primary',
          'hover:border-primary-light',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...rest}
      />
      {error && <p className='mt-1 text-sm text-error'>{error}</p>}{' '}
    </div>
  );
};

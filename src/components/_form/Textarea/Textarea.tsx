import clsx from 'clsx';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

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
    <div className='mb-4'>
      <label htmlFor={id} className='mb-1 block text-sm font-medium text-white'>
        {label}
      </label>
      <textarea
        id={id}
        {...register(id)}
        rows={rows}
        className={clsx(
          'block w-full rounded-md border border-accent bg-background px-3 py-[10px] text-white shadow-sm sm:text-sm',
          'focus:border-primary focus:outline-none focus:ring-primary',
          'hover:border-primary-light',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...textareaProps}
      />
      {error && <p className='mt-1 text-sm text-error'>{error}</p>}{' '}
    </div>
  );
};

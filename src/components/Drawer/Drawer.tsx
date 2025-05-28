'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title = 'Filtry',
}: IDrawerProps) => {
  return (
    <>
      <div
        className={clsx('fixed inset-0 z-40 bg-black transition-opacity', {
          'opacity-50': isOpen,
          'pointer-events-none opacity-0': !isOpen,
        })}
        onClick={onClose}
      />
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-background-light p-6 shadow-xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-2xl font-semibold text-white hover:text-gray-400'
            aria-label='Zamknij panel'
          >
            &times;
          </button>
        </div>
        <div className='mt-6'>{children}</div>
      </div>
    </>
  );
};

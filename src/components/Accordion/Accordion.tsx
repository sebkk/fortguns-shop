'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { ArrowIcon } from '@/components/_icons/ArrowIcon';
import { Typography } from '@/components/Typography';

interface AccordionProps {
  title: string;
  content: string;
}

export const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='overflow-hidden rounded-2.5'>
      <button
        className='flex w-full items-center justify-between bg-background-light px-6 py-5 text-left focus:outline-none'
        onClick={toggleOpen}
      >
        <Typography
          variant='c-heading'
          tag='h3'
          fontSize='xl'
          className='flex-1'
        >
          {title}
        </Typography>
        <ArrowIcon
          className={clsx({
            'rotate-180': isOpen,
          })}
        />
      </button>
      <div
        className={clsx(
          'transition-max-height overflow-hidden duration-300 ease-in-out',
          {
            'max-h-screen': isOpen,
            'max-h-0': !isOpen,
          },
        )}
      >
        <div
          className={clsx('grid transition-all duration-300 ease-in-out', {
            'grid-rows-[1fr]': isOpen,
            'grid-rows-[0fr]': !isOpen,
          })}
        >
          <div className='overflow-hidden'>
            <div className='bg-background-dark px-6 py-5'>
              <Typography variant='body' tag='p' className='leading-normal'>
                {content}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

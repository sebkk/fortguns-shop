'use client';
import React from 'react';
import { LocationIcon } from '@/components/_icons/LocationIcon';
import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '../_icons/PhoneIcon';

interface IContactAddressesBarProps {
  isScrolling?: boolean;
}

export const ContactAddressesBar = (
  {
    // isScrolling,
  }: IContactAddressesBarProps,
) => {
  return (
    <div className='bg-background-light px-4 py-2'>
      <address className='container flex items-center justify-between not-italic'>
        <div className='flex items-center gap-2'>
          <LocationIcon /> {'Borowa 126A, 24-100 Borowa, Lubelskie'}
        </div>
        <div className='flex items-center gap-6'>
          <a className='flex items-center gap-2'>
            <MailIcon />
            fortguns@mail.com
          </a>
          <a className='flex items-center gap-2'>
            <PhoneIcon /> 666 366 361
          </a>
        </div>
      </address>
    </div>
  );
};

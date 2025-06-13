'use client';

import clsx from 'clsx';

import { LocationIcon } from '@/components/_icons/LocationIcon';
import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '@/components/_icons/PhoneIcon';

import styles from './styles.module.scss';

interface IContactAddressesBarProps {
  className?: string;
}

export const ContactAddressesBar = ({
  className,
}: IContactAddressesBarProps) => {
  return (
    <div className={clsx(styles['contact-bar-wrapper'], className)}>
      <address className={styles['contact-bar-address-element']}>
        <div className={styles['location-info']}>
          <LocationIcon />{' '}
          <span className='contact-address-bar-text'>
            {'Borowa 126A, 24-100 Borowa, Lubelskie'}
          </span>
        </div>
        <div className={styles['contact-details']}>
          <a href='mailto:fortguns@mail.com' className={styles['contact-link']}>
            <MailIcon />
            <span className='contact-address-bar-text'>fortguns@mail.com</span>
          </a>
          <a href='tel:666366361' className={styles['contact-link']}>
            <PhoneIcon />{' '}
            <span className='contact-address-bar-text'>666 366 361</span>
          </a>
        </div>
      </address>
    </div>
  );
};

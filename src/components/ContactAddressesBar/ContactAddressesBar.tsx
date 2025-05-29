'use client';

import { LocationIcon } from '@/components/_icons/LocationIcon';
import { MailIcon } from '@/components/_icons/MailIcon';
import { PhoneIcon } from '@/components/_icons/PhoneIcon';

import styles from './styles.module.scss';

interface IContactAddressesBarProps {
  isScrolling?: boolean;
}

export const ContactAddressesBar = ({}: IContactAddressesBarProps) => {
  return (
    <div className={styles['contact-bar-wrapper']}>
      <address className={styles['contact-bar-address-element']}>
        <div className={styles['location-info']}>
          <LocationIcon /> {'Borowa 126A, 24-100 Borowa, Lubelskie'}
        </div>
        <div className={styles['contact-details']}>
          <a href='mailto:fortguns@mail.com' className={styles['contact-link']}>
            <MailIcon />
            fortguns@mail.com
          </a>
          <a href='tel:666366361' className={styles['contact-link']}>
            <PhoneIcon /> 666 366 361
          </a>
        </div>
      </address>
    </div>
  );
};

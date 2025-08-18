'use client';

import clsx from 'clsx';

import { LocationIcon } from '@/components/_icons/LocationIcon';
import globalInfos from '@/constants/api/global-infos';
import { getContactInfoIcon, getLinkHref } from '@/helpers/links';
import { TLinkHref } from '@/types/footer';

import styles from './styles.module.scss';

interface IContactAddressesBarProps {
  className?: string;
}

export const ContactAddressesBar = ({
  className,
}: IContactAddressesBarProps) => {
  const address = globalInfos.contact_infos.find(
    (info) => info.type === 'address',
  );

  return (
    <div className={clsx(styles['contact-bar-wrapper'], className)}>
      <address className={styles['contact-bar-address-element']}>
        <div className={styles['location-info']}>
          <LocationIcon />
          <span className='contact-address-bar-text'>{address?.label}</span>
        </div>
        <div className={styles['contact-details']}>
          {globalInfos.contact_infos
            .filter(({ type }) => type !== 'address')
            .map(({ href, type, label }) => (
              <a
                key={href}
                href={getLinkHref(href, type as TLinkHref)}
                className={styles['contact-link']}
              >
                {getContactInfoIcon(type)}
                <span className='contact-address-bar-text'>{label}</span>
              </a>
            ))}
        </div>
      </address>
    </div>
  );
};

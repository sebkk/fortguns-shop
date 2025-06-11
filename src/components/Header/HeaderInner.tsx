'use client';

import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import Image from 'next/image';
// import { useState } from 'react';

import { useOnScrollEvent } from '@/hooks/useOnScrollEvent';
import { MenuItem } from '@/types/menus';

import { ContactAddressesBar } from '../ContactAddressesBar';
import { HeaderNav } from './HeaderNav';
import styles from './styles.module.scss';

interface IHeaderInnerProps {
  navHeaderMenuItems: MenuItem[];
}
// const HEADER_HEIGHT = 136;
const headerId = 'navbar-fixed';

export const HeaderInner = ({ navHeaderMenuItems }: IHeaderInnerProps) => {
  // const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT);

  const { isScrolling, scrollingRef: headerRef } =
    useOnScrollEvent<HTMLElement>({
      elementId: headerId,
      callback: (_e, element) => {
        if (element) {
          // setHeaderHeight(element.clientHeight);
        }
      },
    });

  return (
    <header
      id={headerId}
      className={clsx(styles['header-fixed'])}
      ref={headerRef}
    >
      <ContactAddressesBar className={styles['header_contact-address-bar']} />
      <div
        className={clsx(
          styles['header-inner-container'],
          isScrolling && styles['header-inner-container--scrolling'],
        )}
      >
        <Link className={styles['header-link']} href='/'>
          <Image
            src='https://fortguns.pl/wp-content/uploads/2024/09/cropped-logo-transparent-600x200.png.webp'
            alt='Fortguns'
            width={600}
            height={200}
            className={clsx(
              styles['header-logo-image'],
              isScrolling && styles['header-logo-image--scrolling'],
            )}
          />
        </Link>
        <HeaderNav
          navHeaderMenuItems={navHeaderMenuItems}
          isScrolling={isScrolling}
          // headerRef={headerRef}
          // headerHeight={headerHeight}
        />
        <div />
      </div>
    </header>
  );
};

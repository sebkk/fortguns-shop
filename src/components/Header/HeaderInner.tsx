'use client';

import { useContext, useEffect } from 'react';

import clsx from 'clsx';

import { ContactAddressesBar } from '@/components/ContactAddressesBar';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { Logo } from '@/components/Logo';
import { Search } from '@/components/Search';
import { useOnScrollEvent } from '@/hooks/useOnScrollEvent';
import { Link } from '@/i18n/navigation';
import { ScrollContext } from '@/providers/ScrollProvider';
import { IScrollContext } from '@/providers/ScrollProvider/ScrollProvider';
import { MenuItem } from '@/types/menus';

import { HeaderDrawerNav } from './HeaderDrawerNav';
import { HeaderNav } from './HeaderNav';
import styles from './styles.module.scss';

interface IHeaderInnerProps {
  navHeaderMenuItems: MenuItem[];
}
const headerId = 'navbar-fixed';

export const HeaderInner = ({ navHeaderMenuItems }: IHeaderInnerProps) => {
  const { isScrolling, scrollingRef: headerRef } =
    useOnScrollEvent<HTMLElement>({
      elementId: headerId,
    });
  const { handleScrolling } = useContext(ScrollContext) as IScrollContext;

  useEffect(() => {
    handleScrolling(isScrolling);
  }, [isScrolling]);

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
          <Logo
            className={clsx(
              styles['header-logo-image'],
              isScrolling && styles['header-logo-image--scrolling'],
            )}
            imageProps={{
              width: 192,
              height: 64,
            }}
          />
        </Link>
        <HeaderNav
          navHeaderMenuItems={navHeaderMenuItems}
          isScrolling={isScrolling}
          className={styles['hide-on-small-screen']}
        />
        <Search
          className={clsx(styles['header-search'], styles['search-visible'])}
        />
        <HamburgerMenu
          className={clsx(
            styles['header-hamburger-btn'],
            styles['hide-on-large-screen'],
          )}
          drawerProps={{
            titleElement: (
              <Link className={styles['header-logo-link--image']} href='/'>
                <Logo
                  className={styles['header-logo-image-mobile']}
                  imageProps={{
                    width: 160,
                    height: 53.33,
                  }}
                />
              </Link>
            ),
          }}
        >
          <HeaderDrawerNav navHeaderMenuItems={navHeaderMenuItems} />
        </HamburgerMenu>
      </div>
    </header>
  );
};

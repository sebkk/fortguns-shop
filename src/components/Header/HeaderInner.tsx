'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { insertTransition } from '@/helpers/tailwind/transition';
import { useOnScrollEvent } from '@/hooks/useOnScrollEvent';
import { MenuItem } from '@/types/menus';

import { ContactAddressesBar } from '../ContactAddressesBar';
import { HeaderNav } from './HeaderNav/HeaderNav';

interface IHeaderInnerProps {
  navHeaderMenuItems: MenuItem[];
}
const HEADER_HEIGHT = 136;
const headerId = 'navbar-fixed';

export const HeaderInner = ({ navHeaderMenuItems }: IHeaderInnerProps) => {
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT);

  const { isScrolling, scrollingRef: headerRef } =
    useOnScrollEvent<HTMLElement>({
      elementId: headerId,
      callback: (_e, element) => {
        if (element) {
          console.log(element);

          setHeaderHeight(element.clientHeight);
        }
      },
    });

  console.log(headerHeight);

  const headerClassName = clsx(
    'fixed z-50 w-full border-b-[1px] border-solid border-b-border-light bg-background shadow-md',
  );

  const headerInnerClassName = clsx(
    `container flex items-center justify-between text-white ${insertTransition('transition-padding', 'D300', 'ease-in-out')}`,
    isScrolling ? 'py-1' : 'py-4',
    'relative',
  );

  const imageHeaderClassName = clsx(
    `h-auto  ${insertTransition('transition-width', 'D300', 'ease-in-out')}`,
    isScrolling ? 'w-[150px]' : 'w-48',
  );

  return (
    <header id={headerId} className={headerClassName} ref={headerRef}>
      <ContactAddressesBar isScrolling={isScrolling} />
      <div className={headerInnerClassName}>
        <Link href='/'>
          <Image
            src='https://fortguns.pl/wp-content/uploads/2024/09/cropped-logo-transparent-600x200.png.webp'
            alt='Fortguns'
            width={600}
            height={200}
            className={imageHeaderClassName}
          />
        </Link>
        <HeaderNav
          navHeaderMenuItems={navHeaderMenuItems}
          isScrolling={isScrolling}
          headerRef={headerRef}
          headerHeight={headerHeight}
        />
        <div />
      </div>
    </header>
  );
};

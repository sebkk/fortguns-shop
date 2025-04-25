'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { insertTransition } from '@/helpers/tailwind/transition';
import { useMounted } from '@/hooks/useMounted';

import { ContactAddressesBar } from '../ContactAddressesBar';

export const Header = ({}) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const isMounted = useMounted();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setIsScrolling(false);
      } else if (scrollTop > 0) {
        setIsScrolling(true);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMounted]);

  const headerClassName = clsx(
    'fixed z-50 w-full border-b-[1px] border-solid border-b-border-light bg-background shadow-md',
  );

  const headerInnerClassName = clsx(
    `container flex items-center justify-between text-white ${insertTransition('transition-padding', 'D300', 'ease-in-out')}`,
    isScrolling ? 'py-2' : 'py-4',
  );

  const imageHeaderClassName = clsx(
    `h-auto  ${insertTransition('transition-width', 'D300', 'ease-in-out')}`,
    isScrolling ? 'w-40' : 'w-48',
  );

  return (
    <header id='navbar-fixed' className={headerClassName} ref={headerRef}>
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
        <nav>links</nav>
      </div>
    </header>
  );
};

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// interface IHeaderProps {}

export const Header = ({}) => {
  return (
    <header>
      <div className='container flex py-4'>
        <h1>
          <Link href='/'>
            <Image
              src='https://fortguns.pl/wp-content/uploads/2024/09/cropped-logo-transparent-600x200.png.webp'
              alt='Fortguns'
              width={600}
              height={200}
              className='h-auto w-48'
            />
          </Link>
        </h1>
        <nav>links</nav>
      </div>
    </header>
  );
};

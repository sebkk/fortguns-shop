import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// interface IHeaderProps {}

export const Header = ({}) => {
  return (
    <header className='w-full bg-elevation-1'>
      <div className='container flex items-center justify-between py-4 text-white'>
        <Link href='/'>
          <Image
            src='https://fortguns.pl/wp-content/uploads/2024/09/cropped-logo-transparent-600x200.png.webp'
            alt='Fortguns'
            width={600}
            height={200}
            className='h-auto w-48'
          />
        </Link>
        <nav>links</nav>
      </div>
    </header>
  );
};

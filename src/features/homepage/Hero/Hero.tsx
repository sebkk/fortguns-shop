import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  return (
    <div className='fixed z-0 h-screen w-full overflow-hidden'>
      <Image
        width={1600}
        height={1067}
        alt='page hero image'
        src='https://fortguns.pl/wp-content/uploads/2024/10/grafika.webp'
        className='h-auto w-full bg-cover bg-bottom object-fill'
      />
    </div>
  );
};

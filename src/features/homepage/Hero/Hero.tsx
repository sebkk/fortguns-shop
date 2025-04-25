'use client';

import Image from 'next/image';

import { Typography } from '@/components/Typography';

export const Hero = () => {
  return (
    <div className='w-full'>
      <div className='relative overflow-hidden rounded-5'>
        <Image
          width={1600}
          height={1067}
          alt='page hero image'
          src='https://fortguns.pl/wp-content/uploads/2024/10/grafika.webp'
          className='h-auto w-full bg-cover object-fill'
          priority
        />
        <div className='container absolute bottom-6 z-10 max-w-[900px]'>
          <Typography variant='main-heading' className='mb-4' tag='h1'>
            {'Bezpieczeństwo,\r\n jakość i sumienność.'}
          </Typography>
          <Typography variant='subheading' tag='p'>
            Przekonaj się – Sprawdź naszą ofertę i znajdź idealną jednostkę dla
            siebie!
          </Typography>
        </div>
      </div>
    </div>
  );
};

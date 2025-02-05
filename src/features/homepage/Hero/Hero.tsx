import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  return (
    <div
      style={{
        clipPath: 'inset(0 0 0 0)',
      }}
      className='relative h-[600px] w-full'
    >
      <div className='fixed left-0 top-0 flex w-full items-center justify-center overflow-hidden'>
        <Image
          width={1600}
          height={1067}
          alt='page hero image'
          src='https://fortguns.pl/wp-content/uploads/2024/10/grafika.webp'
          className='h-auto w-full bg-cover bg-bottom object-fill'
          priority={true}
        />
        <div className='container absolute z-10'>
          <Typography variant='main-heading' className='mb-4' tag='h1'>
            {'Bezpieczeństwo,\r\n jakość i sumienność.'}
          </Typography>
          <Typography variant='subheading' tag='p'>
            Przekonaj się – Sprawdź naszą ofertę i znajdź idealną jednostkę dla
            siebie!
          </Typography>
          <div className='mt-7 flex gap-4'>
            <Button className='w-44'>Oferta</Button>
            <Button className='w-44'>O nas</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

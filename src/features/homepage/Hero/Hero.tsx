import { Button } from '@/components/Button';
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
      <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden'>
        <Image
          width={1600}
          height={1067}
          alt='page hero image'
          src='https://fortguns.pl/wp-content/uploads/2024/10/grafika.webp'
          className='h-auto w-full bg-cover bg-bottom object-fill'
          priority={true}
        />
        <div className='container absolute z-10'>
          <h1 className='mb-4 whitespace-pre-line text-6xl'>
            {'Bezpieczeństwo,\r\n jakość i sumienność.'}
          </h1>
          <p className='text-3xl'>
            Przekonaj się – Sprawdź naszą ofertę i znajdź idealną jednostkę dla
            siebie!
          </p>
          <div className='mt-7 flex gap-4'>
            <Button className='w-44'>Oferta</Button>
            <Button className='w-44'>O nas</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

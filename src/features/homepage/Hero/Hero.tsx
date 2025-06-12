'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { Typography } from '@/components/Typography';
import { useScroll } from '@/providers/ScrollProvider';

import styles from './styles.module.scss';

export const Hero = () => {
  const { isScrolling } = useScroll();

  return (
    <>
      <div className={styles['hero-scroll-container']} />
      <div
        className={clsx(
          styles['hero-wrapper'],
          isScrolling && styles['hero-wrapper--scrolling'],
        )}
      >
        <div className={styles['hero-image-container']}>
          <Image
            width={1600}
            height={1067}
            alt='page hero image'
            src='https://fortguns.pl/wp-content/uploads/2024/10/grafika.webp'
            className={styles['hero-image']}
            priority
          />
          <div className={styles['hero-content-container']}>
            <Typography
              variant='main-heading'
              className={styles['hero-main-heading']}
              tag='h1'
            >
              {'Bezpieczeństwo,\r\n jakość i sumienność.'}
            </Typography>
            <Typography variant='subheading' tag='p'>
              Przekonaj się – Sprawdź naszą ofertę i znajdź idealną jednostkę
              dla siebie!
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

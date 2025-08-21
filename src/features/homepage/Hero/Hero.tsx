'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/components/Typography';
import { useScroll } from '@/providers/ScrollProvider';
import { ISectionHero } from '@/types/sections';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './styles.module.scss';

interface IHeroProps {
  slides: ISectionHero['slides'];
}

export const Hero = ({ slides }: IHeroProps) => {
  const { isScrolling } = useScroll();

  return (
    <>
      <div className={styles['hero-scroll-container']} />
      <div
        className={clsx(
          styles['hero-wrapper'],
          isScrolling && styles['hero-wrapper--scrolling'],
        )}
        style={
          {
            '--swiper-theme-color': '#4caf50',
            '--swiper-navigation-size': '15px',
          } as React.CSSProperties
        }
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 2500,
          }}
          modules={[Pagination, Navigation]}
          className={styles['hero-swiper']}
          navigation={slides.length > 1}
          pagination={{
            clickable: true,
          }}
        >
          {slides.map(({ title, picture, description }, index) => (
            <SwiperSlide key={`${picture.id}-${index}`}>
              <div className={styles['hero-image-container']}>
                <Image
                  width={1600}
                  height={1067}
                  alt='page hero image'
                  src={picture.url}
                  className={styles['hero-image']}
                  priority
                />
                <div className={styles['hero-content-container']}>
                  <Typography
                    variant='main-heading'
                    className={styles['hero-main-heading']}
                    tag='h1'
                  >
                    {title}
                  </Typography>
                  <Typography variant='subheading' tag='p'>
                    {description}
                  </Typography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

'use client';
import { useContext, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/components/Typography';
import { IScrollContext, ScrollContext } from '@/providers/ScrollProvider';
import { ISectionHero } from '@/types/sections';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './styles.module.scss';

interface IHeroProps {
  slides: ISectionHero['slides'];
}

export const Hero = ({ slides }: IHeroProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const { isScrolling } = useContext(ScrollContext) as IScrollContext;
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
          onSwiper={(swiper) => {
            // @ts-expect-error - swiper.initialized is not typed, but exists at runtime.
            setIsInitialized(swiper.initialized);
          }}
        >
          {slides.map(({ title, picture, description }, index) => (
            <SwiperSlide
              className={clsx(
                !isInitialized && styles['hero-swiper-slide--not-initialized'],
              )}
              key={`${picture.id}-${index}`}
            >
              <div className={styles['hero-image-container']}>
                <Image
                  // width={1920}
                  // height={1080}
                  fill
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

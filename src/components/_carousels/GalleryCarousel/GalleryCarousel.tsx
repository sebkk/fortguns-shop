import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { NavigationButton } from '@/components/_carousels/components/NavigationButton';

import styles from './styles.module.scss';

import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const swiperButtonPrev = styles['products-btn_prev'];
const swiperButtonNext = styles['products-btn_next'];

interface GalleryCarouselProps {
  images: {
    id: string | number;
    url: string;
    alt: string;
  }[];
  hideButtons?: boolean;
  swiperConfig?: SwiperProps;
  swiperThumbsConfig?: SwiperProps;
}

export const GalleryCarousel = ({
  images,
  hideButtons = false,
  swiperConfig = {},
  swiperThumbsConfig = {},
}: GalleryCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  useEffect(() => {
    thumbsSwiper?.slideTo(activeIndex);
  }, [activeIndex]);

  return (
    <div className={styles['gallery-carousel-wrapper']}>
      <Swiper
        spaceBetween={10}
        loop
        {...swiperConfig}
        navigation={{
          nextEl: swiperButtonPrev,
          prevEl: swiperButtonNext,
          disabledClass: styles['products-btn--disabled'],
          hiddenClass: styles['products-btn--hidden'],
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className={styles['gallery-carousel']}
      >
        {!hideButtons && (
          <NavigationButton
            handleNextSlide={handlePrevSlide}
            swiperButtonPrev={swiperButtonPrev}
            direction='prev'
          />
        )}
        {images.map(({ id, url, alt }, index) => (
          <SwiperSlide key={`${id}-${index}`} className={styles['main-slide']}>
            <Image src={url} alt={alt} fill />
          </SwiperSlide>
        ))}
        {!hideButtons && (
          <NavigationButton
            handleNextSlide={handleNextSlide}
            swiperButtonPrev={swiperButtonNext}
            direction='next'
          />
        )}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={15}
        slidesPerView={4.5}
        modules={[Thumbs]}
        className={styles['gallery-carousel-thumbs']}
        threshold={5}
        {...swiperThumbsConfig}
      >
        {images.map(({ id, url, alt }, index) => (
          <SwiperSlide
            key={`${id}-${index}-thumbs`}
            className={clsx(
              styles['thumb-slide'],
              index === activeIndex && styles['thumb-slide--active'],
            )}
            onClick={() => {
              swiperRef.current?.slideTo(index);
            }}
          >
            <Image src={url} alt={alt} fill />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

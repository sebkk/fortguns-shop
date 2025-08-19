'use client';

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
  hideThumbs?: boolean;
  hideMainCarousel?: boolean;
}

export const GalleryCarousel = ({
  images,
  hideButtons = false,
  swiperConfig = {},
  swiperThumbsConfig = {},
  hideThumbs,
  hideMainCarousel,
}: GalleryCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const hasEnoughSlides = images.length > 1;
  const isLoop = hasEnoughSlides && swiperConfig.loop !== false;
  const shouldShowPrevButton =
    !hideButtons && hasEnoughSlides && (isLoop || !isBeginning);

  const shouldShowNextButton =
    !hideButtons && hasEnoughSlides && (isLoop || !isEnd);

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const swiperConfigMainCarousel = hideMainCarousel
    ? {
        slidesPerView: 6,
        spaceBetween: 20,
        ...swiperConfig,
      }
    : { ...swiperConfig };

  useEffect(() => {
    thumbsSwiper?.slideTo(activeIndex);
  }, [activeIndex]);

  return (
    <div className={styles['gallery-carousel-wrapper']}>
      <Swiper
        autoHeight
        spaceBetween={10}
        loop={isLoop}
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
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        thumbs={{
          swiper: !hideThumbs && !hideMainCarousel ? thumbsSwiper : null,
        }}
        modules={[Navigation, Thumbs]}
        className={styles['gallery-carousel']}
        {...swiperConfigMainCarousel}
      >
        {shouldShowPrevButton && (
          <NavigationButton
            handleNextSlide={handlePrevSlide}
            swiperButtonPrev={swiperButtonPrev}
            direction='prev'
            theme='dark'
          />
        )}
        {images.map(({ id, url, alt }, index) => (
          <SwiperSlide key={`${id}-${index}`} className={styles['main-slide']}>
            <Image
              src={url}
              alt={alt}
              height={hideMainCarousel ? 225 : 576}
              width={hideMainCarousel ? 300 : 768}
              className={clsx(
                styles['gallery-carousel_image'],
                hideMainCarousel && styles['gallery-carousel_image--main'],
              )}
            />
          </SwiperSlide>
        ))}
        {shouldShowNextButton && (
          <NavigationButton
            handleNextSlide={handleNextSlide}
            swiperButtonPrev={swiperButtonNext}
            direction='next'
            theme='dark'
          />
        )}
      </Swiper>

      {!hideThumbs && !hideMainCarousel && (
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
          }}
          spaceBetween={15}
          slidesPerView={6}
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
              <Image src={url} alt={alt} width={300} height={225} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

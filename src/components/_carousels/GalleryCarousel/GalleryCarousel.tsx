'use client';

import { useEffect, useRef, useState } from 'react';

import Image, { ImageProps } from 'next/image';

import clsx from 'clsx';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { NavigationButton } from '@/components/_carousels/components/NavigationButton';
import { IPhoto } from '@/types/pages';

import styles from './styles.module.scss';

import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const swiperButtonPrev = styles['products-btn_prev'];
const swiperButtonNext = styles['products-btn_next'];

export interface GalleryCarouselProps {
  images: IPhoto[] | { id: number; url: string; alt: string }[];
  hideButtons?: boolean;
  swiperConfig?: SwiperProps;
  swiperThumbsConfig?: SwiperProps;
  hideThumbs?: boolean;
  hideMainCarousel?: boolean;
  id?: string;
  mainImageProps?: ImageProps;
  thumbsImageProps?: ImageProps;
  onClickOnImage?: (
    e: React.MouseEvent<HTMLImageElement>,
    index: number,
  ) => void;
  swiperWrapperClassName?: string;
}

export const GalleryCarousel = ({
  images,
  hideButtons = false,
  swiperConfig = {},
  swiperThumbsConfig = {},
  hideThumbs,
  hideMainCarousel,
  id,
  mainImageProps,
  thumbsImageProps,
  onClickOnImage,
  swiperWrapperClassName,
}: GalleryCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const currentSlidesPerView = swiperRef.current?.params.slidesPerView || 1;

  const hasEnoughSlides = images.length > Number(currentSlidesPerView);
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
        slidesPerView: 3,
        slidesPerGroup: 3,
        breakpoints: {
          730: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1050: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        },
        spaceBetween: 20,
        ...swiperConfig,
      }
    : {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        ...swiperConfig,
      };

  useEffect(() => {
    if (thumbsSwiper && activeIndex >= 0) {
      thumbsSwiper.slideTo(activeIndex);
    }
  }, [activeIndex, thumbsSwiper]);

  return (
    <div
      className={clsx(
        styles['gallery-carousel-wrapper'],
        hideMainCarousel &&
          styles['gallery-carousel-wrapper--hide-main-carousel'],
        swiperWrapperClassName,
      )}
      style={
        {
          '--swiper-theme-color': '#4caf50',
        } as React.CSSProperties
      }
    >
      <Swiper
        autoHeight
        loop={isLoop}
        id={id}
        navigation={{
          nextEl: swiperButtonNext,
          prevEl: swiperButtonPrev,
          disabledClass: styles['products-btn--disabled'],
          hiddenClass: styles['products-btn--hidden'],
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (swiper.realIndex !== undefined && !isNaN(swiper.realIndex)) {
            setActiveIndex(swiper.realIndex);
          }
        }}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          if (typeof realIndex === 'number' && !isNaN(realIndex)) {
            setActiveIndex(realIndex);
          }
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        thumbs={{
          swiper: !hideThumbs && !hideMainCarousel ? thumbsSwiper : null,
        }}
        modules={[Navigation, Thumbs, Pagination]}
        pagination={hideMainCarousel && { clickable: true }}
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
        {images.map((image, index) => (
          <SwiperSlide
            key={`${image.id}-${index}`}
            className={styles['main-slide']}
          >
            <Image
              src={image.url}
              alt={image.alt}
              height={hideMainCarousel ? 225 : 576}
              width={hideMainCarousel ? 300 : 768}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={clsx(
                styles['gallery-carousel_image'],
                hideMainCarousel && styles['gallery-carousel_image--main'],
                onClickOnImage && styles['gallery-carousel_image--clickable'],
              )}
              onClick={(e) => onClickOnImage && onClickOnImage(e, index)}
              {...mainImageProps}
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
          slidesPerView={3}
          breakpoints={{
            730: {
              slidesPerView: 6,
            },
          }}
          modules={[Thumbs]}
          className={styles['gallery-carousel-thumbs']}
          threshold={5}
          {...swiperThumbsConfig}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image.id}-${index}-thumbs`}
              className={clsx(
                styles['thumb-slide'],
                index === activeIndex && styles['thumb-slide--active'],
              )}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideToLoop(index);
                }
              }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={300}
                height={225}
                className={styles['gallery-carousel-thumbs-image']}
                {...thumbsImageProps}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

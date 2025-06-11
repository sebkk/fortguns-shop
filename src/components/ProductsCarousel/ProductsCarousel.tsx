'use client';

import { useEffect, useRef, useState } from 'react';
import type TSwiper from 'swiper';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import productsApi from '@/api/woocommerce/products';
import { Button } from '@/components/Button';
import { ProductCard } from '@/components/ProductCard';
import { IProduct } from '@/types/product';
import clsx from 'clsx';
import 'swiper/css';

import { ArrowIcon } from '../_icons/ArrowIcon';
import styles from './styles.module.scss';

const swiperButtonPrev = styles['products-btn_prev'];
const swiperButtonNext = styles['products-btn_next'];

interface IProductsCarouselProps {
  swiperConfig?: SwiperProps;
  hideButtons?: boolean;
  items?: IProduct[];
}

export const ProductsCarousel = ({
  swiperConfig = {},
  hideButtons = false,
  items,
}: IProductsCarouselProps) => {
  const [products, setProducts] = useState<null | IProduct[]>(null);

  const swiperRef = useRef<TSwiper | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await productsApi.getProducts({
        per_page: 12,
        stock_status: 'instock',
      });

      setProducts(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  useEffect(() => {
    if (!items) {
      fetchProducts();
    }
  }, []);

  const productsToDisplay = items || products;

  if (!productsToDisplay) return null;
  return (
    <div className={clsx(styles['products-carousel-wrapper'])}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        watchSlidesProgress
        spaceBetween={15}
        slidesPerView={1.2}
        slidesPerGroup={1}
        slidesOffsetBefore={10}
        slidesOffsetAfter={10}
        breakpoints={{
          530: { slidesPerGroup: 2, slidesPerView: 2.2, spaceBetween: 10 },
          768: {
            slidesPerGroup: 2,
            slidesPerView: 3,
            spaceBetween: 15,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
          },
          1020: { slidesPerGroup: 2, slidesPerView: 4, spaceBetween: 20 },
        }}
        loopAddBlankSlides={false}
        keyboard
        mousewheel
        navigation={{
          nextEl: swiperButtonPrev,
          prevEl: swiperButtonNext,
          disabledClass: styles['products-btn--disabled'],
          hiddenClass: styles['products-btn--hidden'],
        }}
        modules={[Mousewheel, Keyboard, Navigation]}
        className={clsx(styles['products-carousel'])}
        {...swiperConfig}
      >
        {/* TODO: HIDE ON SMALL AMOUNT OF SLIDES */}
        {!hideButtons && (
          <Button
            variant='blank'
            className={clsx(styles['products-btn'], swiperButtonPrev)}
            onClick={handleNextSlide}
          >
            <ArrowIcon />
          </Button>
        )}
        {productsToDisplay.map((product) => (
          <SwiperSlide style={{ height: 'auto' }} key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
        {!hideButtons && (
          <Button
            variant='blank'
            className={clsx(styles['products-btn'], swiperButtonNext)}
            onClick={handlePrevSlide}
          >
            <ArrowIcon />
          </Button>
        )}
      </Swiper>
    </div>
  );
};

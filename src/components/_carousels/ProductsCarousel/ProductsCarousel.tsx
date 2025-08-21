'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import 'swiper/css';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import productsApi from '@/api/woocommerce/products';
import { NavigationButton } from '@/components/_carousels/components/NavigationButton';
import { ProductCard } from '@/components/ProductCard';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { IProduct, StockStatus } from '@/types/product';

import styles from './styles.module.scss';

import type TSwiper from 'swiper';

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
  const [shouldShowButtons, setShouldShowButtons] = useState(true);

  const swiperRef = useRef<TSwiper | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await productsApi.getProducts({
        per_page: PER_PAGE_DEFAULT,
        stock_status: StockStatus.INSTOCK,
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

  const handleSwiperInit = (swiper: TSwiper) => {
    swiperRef.current = swiper;
    const currentSlidesPerView = swiper.params.slidesPerView as number;
    setShouldShowButtons(productsToDisplay.length > currentSlidesPerView);
  };

  const handleResize = (swiper: TSwiper) => {
    swiperRef.current = swiper;
    const currentSlidesPerView = swiper.params.slidesPerView as number;
    setShouldShowButtons(productsToDisplay.length > currentSlidesPerView);
  };

  return (
    <div className={clsx(styles['products-carousel-wrapper'])}>
      <Swiper
        onSwiper={handleSwiperInit}
        onResize={handleResize}
        onSlideChange={(swiper) => {
          swiperRef.current = swiper;
        }}
        watchSlidesProgress
        spaceBetween={15}
        slidesPerView={1.2}
        slidesPerGroup={1}
        breakpoints={{
          530: { slidesPerGroup: 2, slidesPerView: 2.2, spaceBetween: 20 },
          768: {
            slidesPerGroup: 2,
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1020: {
            slidesPerGroup: 2,
            slidesPerView: 4,
            spaceBetween: 20,
          },
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
        {!hideButtons && shouldShowButtons && (
          <NavigationButton
            handleNextSlide={handlePrevSlide}
            swiperButtonPrev={swiperButtonPrev}
            direction='prev'
          />
        )}
        {productsToDisplay.map((product) => (
          <SwiperSlide
            className={styles['products-carousel-swiper-slide']}
            style={{ height: 'auto' }}
            key={product.id}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
        {!hideButtons && shouldShowButtons && (
          <NavigationButton
            handleNextSlide={handleNextSlide}
            swiperButtonPrev={swiperButtonNext}
            direction='next'
          />
        )}
      </Swiper>
    </div>
  );
};

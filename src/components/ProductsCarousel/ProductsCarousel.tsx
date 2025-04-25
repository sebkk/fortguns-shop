'use client';

import { useEffect, useState } from 'react';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import productsApi from '@/api/woocommerce/products';
import { ProductCard } from '@/components/ProductCard';

import 'swiper/css';

interface IProductsCarouselProps {
  swiperConfig?: SwiperProps;
}

export const ProductsCarousel = ({
  swiperConfig = {},
}: IProductsCarouselProps) => {
  const [products, setProducts] = useState<null | { id: string }[]>(null);

  const fetchProducts = async () => {
    try {
      const res = await productsApi.getProducts();

      setProducts(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) return null;
  return (
    <div>
      <Swiper
        // cssMode
        spaceBetween={15}
        slidesPerView={3}
        keyboard
        mousewheel
        modules={[Mousewheel, Keyboard]}
        {...swiperConfig}
      >
        {products.map((product) => (
          <SwiperSlide style={{ height: 'auto' }} key={product.id}>
            <ProductCard product={product as any} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

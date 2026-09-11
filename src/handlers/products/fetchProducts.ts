import { unstable_cache } from 'next/cache';

import productsApi from '@/api/woocommerce/products';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { createStableCacheKey } from '@/helpers/cache';
import {
  IGetProductsParams,
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
} from '@/types/product';

export const fetchProducts = async <T>({
  params,
}: {
  params: IGetProductsParams;
}): Promise<{
  products: T[];
  totalPages: number;
  totalProducts: number;
}> => {
  try {
    const res = await productsApi.getProducts<T>({
      per_page: PER_PAGE_DEFAULT,
      orderby: PRODUCTS_ORDER_BY.DATE,
      order: PRODUCTS_ORDER.DESC,
      ...params,
      page: params.page ? +params.page : 1,
    });

    // Nagłówki HTTP to tekst. Typ deklaruje liczby, więc bez tej zamiany
    // porównanie w rodzaju totalProducts === 0 nigdy nie jest prawdziwe, a
    // kompilator niczego nie zgłosi.
    return {
      products: res.data,
      totalPages: Number(res.headers['x-wp-totalpages'] ?? 0),
      totalProducts: Number(res.headers['x-wp-total'] ?? 0),
    };
  } catch (error) {
    console.error(error);

    return {
      products: [],
      totalPages: 0,
      totalProducts: 0,
    };
  }
};

const cachedFetchProductsRequest = unstable_cache(
  async (paramsCacheKey: string) =>
    fetchProducts<unknown>({
      params: JSON.parse(paramsCacheKey) as IGetProductsParams,
    }),
  ['products-listing'],
  {
    revalidate: PRODUCTS_DATA_REVALIDATE,
    tags: ['products'],
  },
);

export const cachedFetchProducts = async <T>({
  params,
}: {
  params: IGetProductsParams;
}): Promise<{
  products: T[];
  totalPages: number;
  totalProducts: number;
}> => {
  return (await cachedFetchProductsRequest(createStableCacheKey(params))) as {
    products: T[];
    totalPages: number;
    totalProducts: number;
  };
};

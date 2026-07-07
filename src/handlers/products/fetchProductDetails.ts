import { unstable_cache } from 'next/cache';

import products from '@/api/woocommerce/products';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { createStableCacheKey } from '@/helpers/cache';
import { IGetProductsParams } from '@/types/product';

export const fetchProductDetails = async <T>(
  productSlug: string,
  params?: IGetProductsParams,
): Promise<T | null> => {
  try {
    const response = await products.getProductDetails<T>(productSlug, params);

    const [product] = response.data;

    if (product) return product;

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const cachedFetchProductDetailsRequest = unstable_cache(
  async (slug: string, paramsCacheKey: string) =>
    fetchProductDetails<unknown>(
      slug,
      JSON.parse(paramsCacheKey) as IGetProductsParams,
    ),
  ['product-details'],
  {
    revalidate: PRODUCTS_DATA_REVALIDATE,
    tags: ['products'],
  },
);

export const cachedFetchProductDetails = async <T>(
  productSlug: string,
  params: IGetProductsParams = {},
): Promise<T | null> => {
  return (await cachedFetchProductDetailsRequest(
    productSlug,
    createStableCacheKey(params),
  )) as T | null;
};

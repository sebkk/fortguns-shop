import { unstable_cache } from 'next/cache';

import { AxiosError } from 'axios';

import brandsAPI from '@/api/woocommerce/brands';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { createStableCacheKey } from '@/helpers/cache';
import { IGetBrandsParams } from '@/types/brands';
import { IGetProductsParams, IProductListing } from '@/types/product';

import { cachedFetchProducts } from '../products/fetchProducts';

export const fetchBrandBySlug = async (
  slug: string,
  {
    brandParams = {},
    productParams = {},
  }: {
    brandParams?: IGetBrandsParams;
    productParams?: IGetProductsParams;
  } = {},
) => {
  try {
    const response = await brandsAPI.getBrand(slug, brandParams);
    const { data } = response || {};

    const [brand] = data;

    const { id: brandId } = brand || {};

    if (!brandId) {
      return {
        brand: null,
        products: [],
        totalPages: 0,
        totalProducts: 0,
      };
    }

    const { products, totalPages, totalProducts } =
      await cachedFetchProducts<IProductListing>({
        params: {
          brand: brandId,
          ...productParams,
        },
      });

    return {
      brand,
      products,
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error(console.error((error as AxiosError).response?.data));
    return {
      brand: null,
      products: [],
      totalPages: 0,
      totalProducts: 0,
    };
  }
};

const cachedFetchBrandBySlugRequest = unstable_cache(
  async (
    slug: string,
    brandParamsCacheKey: string,
    productParamsCacheKey: string,
  ) =>
    fetchBrandBySlug(slug, {
      brandParams: JSON.parse(brandParamsCacheKey) as IGetBrandsParams,
      productParams: JSON.parse(productParamsCacheKey) as IGetProductsParams,
    }),
  ['brand-listing'],
  {
    revalidate: PRODUCTS_DATA_REVALIDATE,
    tags: ['brands', 'products'],
  },
);

export const cachedFetchBrandBySlug = async (
  slug: string,
  {
    brandParams = {},
    productParams = {},
  }: {
    brandParams?: IGetBrandsParams;
    productParams?: IGetProductsParams;
  } = {},
) => {
  return await cachedFetchBrandBySlugRequest(
    slug,
    createStableCacheKey(brandParams),
    createStableCacheKey(productParams),
  );
};

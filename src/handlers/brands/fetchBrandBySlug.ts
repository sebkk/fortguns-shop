import { unstable_cache } from 'next/cache';

import { AxiosError } from 'axios';

import brandsAPI from '@/api/woocommerce/brands';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { createStableCacheKey } from '@/helpers/cache';
import { IGetBrandsParams } from '@/types/brands';
import { IGetProductsParams, IProductListing } from '@/types/product';

import { fetchProducts } from '../products/fetchProducts';

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
  const pusto = {
    brand: null,
    products: [] as IProductListing[],
    totalPages: 0,
    totalProducts: 0,
  };

  let brand;

  try {
    const response = await brandsAPI.getBrand(slug, brandParams);
    const { data } = response || {};

    [brand] = data;
  } catch (error) {
    console.error((error as AxiosError).response?.data);

    return pusto;
  }

  const { id: brandId } = brand || {};

  if (!brandId) {
    return pusto;
  }

  // Zwykłe fetchProducts, nie wersja spod unstable_cache — całość i tak jest
  // opakowana w unstable_cache niżej, a zagnieżdżenie dwóch takich pamięci
  // wywracało pobieranie i zostawiało puste strony marek.
  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        brand: brandId,
        ...productParams,
      },
    });

  // Marka wraca nawet, gdy produktów nie udało się pobrać — inaczej strona
  // traci też nagłówek i okruszki, i wygląda jak nieistniejąca.
  return {
    brand,
    products,
    totalPages,
    totalProducts,
  };
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

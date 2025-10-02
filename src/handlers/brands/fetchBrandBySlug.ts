import { AxiosError } from 'axios';

import brandsAPI from '@/api/woocommerce/brands';
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
  try {
    const response = await brandsAPI.getBrand(slug, brandParams);
    const { data } = response || {};

    const [brand] = data;

    const { id: brandId } = brand || {};

    const { products, totalPages, totalProducts } =
      await fetchProducts<IProductListing>({
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

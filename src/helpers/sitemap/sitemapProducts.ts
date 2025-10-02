import { MetadataRoute } from 'next';
import pLimit from 'p-limit';

import productsApi from '@/api/woocommerce/products';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PRODUCTS_FIELDS_FOR_SITEMAP } from '@/constants/products';
import { IProductSitemap, STOCK_STATUS } from '@/types/product';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

export const createProductsSitemaps = async (): Promise<
  MetadataRoute.Sitemap[]
> => {
  const products = await productsApi.getProducts<IProductSitemap>({
    _fields: PRODUCTS_FIELDS_FOR_SITEMAP.join(','),
    per_page: 100,
    stock_status: undefined as unknown as STOCK_STATUS,
  });

  const firstPageProducts = products.data;

  const productsTotalPages = products.headers['x-wp-totalpages'];

  const limit = pLimit(3);

  const productsSlugs = await Promise.all(
    Array.from({ length: +productsTotalPages }, async (_, index) => {
      if (index === 0) return [];

      const products = await limit(() =>
        productsApi.getProducts<IProductSitemap>({
          _fields: PRODUCTS_FIELDS_FOR_SITEMAP.join(','),
          per_page: 100,
          stock_status: undefined as unknown as STOCK_STATUS,
          page: index + 1,
        }),
      );

      return products.data;
    }),
  );

  const allProductsSlugs = [...firstPageProducts, ...productsSlugs.flat()];

  const productsPages = allProductsSlugs.map(({ slug, stock_status }) => {
    return createSitemapObject(
      createUrl(
        DEFAULT_LOCALE,
        PATHNAMES[NAVIGATION_ROUTE.PRODUCT_DETAILS][DEFAULT_LOCALE].replace(
          '[productSlug]',
          slug,
        ),
      ),
      {
        priority: stock_status === STOCK_STATUS.INSTOCK ? 0.8 : 0.1,
        changeFrequency:
          stock_status === STOCK_STATUS.INSTOCK ? 'daily' : 'weekly',
      },
    );
  }) as unknown as MetadataRoute.Sitemap[];

  return productsPages;
};

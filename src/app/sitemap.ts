import { MetadataRoute } from 'next';

import { buildLog } from '@/helpers/build/buildLog';
import {
  createBrandsSitemaps,
  createCMSPagesSitemaps,
  createProductsListingSitemaps,
  createProductsSitemaps,
} from '@/helpers/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  try {
    buildLog({
      type: 'info',
      message: 'START',
      functionName: 'sitemap',
    });

    // DEFAULT PAGES
    const defaultPages = await createCMSPagesSitemaps();

    // BRANDS PAGES
    const brandsPages = await createBrandsSitemaps();

    // PRODUCTS PAGES
    const productsPages = await createProductsSitemaps();

    // PRODUCTS LISTING PAGES
    const productsListingPages = await createProductsListingSitemaps();

    const sitemap = [
      ...defaultPages,
      ...brandsPages,
      ...productsPages,
      ...productsListingPages,
    ];

    // eslint-disable-next-line no-console
    buildLog({
      type: 'success',
      message: 'SUCCESS',
      functionName: 'sitemap',
    });

    return sitemap;
  } catch (error) {
    buildLog({
      type: 'error',
      message: 'ERROR',
      functionName: 'sitemap',
      additionalLog: error,
    });
    return [];
  }
}

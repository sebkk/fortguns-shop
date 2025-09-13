import { MetadataRoute } from 'next';

import {
  createBrandsSitemaps,
  createCMSPagesSitemaps,
  createProductsListingSitemaps,
  createProductsSitemaps,
} from '@/helpers/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
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

  return sitemap;
}

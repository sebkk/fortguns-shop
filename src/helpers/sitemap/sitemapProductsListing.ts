import { MetadataRoute } from 'next';
import pLimit from 'p-limit';

import categoriesAPI from '@/api/woocommerce/categories';
import productsAPI from '@/api/woocommerce/products';
import { CATEGORIES_FIELDS_FOR_SITEMAP } from '@/constants/categories';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import {
  PER_PAGE_DEFAULT,
  PRODUCTS_FIELDS_FOR_SITEMAP_LISTING,
} from '@/constants/products';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

const createCategoryPaginationSitemap = async (
  slug: string,
  url: string,
  id?: number,
): Promise<MetadataRoute.Sitemap[]> => {
  const resProducts = await productsAPI.getProducts({
    category: id ? id.toString() : undefined,
    _fields: PRODUCTS_FIELDS_FOR_SITEMAP_LISTING.join(','),
    per_page: 1,
  });

  const totalProducts = resProducts.headers['x-wp-total'] || 0;

  const totalPages = Math.ceil(totalProducts / PER_PAGE_DEFAULT);

  const categoriesPagesPaginationSitemap = Array.from(
    { length: totalPages },
    (_, index) =>
      createSitemapObject(
        createUrl(
          DEFAULT_LOCALE,
          url
            .replace('[categoryName]', slug)
            .replace('[pageNumber]', (index + 1).toString()),
        ),
      ),
  ).filter((_, index) => index !== 0) as unknown as MetadataRoute.Sitemap[];

  return categoriesPagesPaginationSitemap;
};

export const createProductsListingSitemaps = async (): Promise<
  MetadataRoute.Sitemap[]
> => {
  const mainProductsListingSitemap = createSitemapObject(
    createUrl(
      DEFAULT_LOCALE,
      PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE],
    ),
  );

  const mainProductsListingPaginationSitemap =
    await createCategoryPaginationSitemap(
      PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE],
      PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING_PAGINATION][DEFAULT_LOCALE],
      undefined,
    );

  const limit = pLimit(3);

  const resCategories = await limit(() =>
    categoriesAPI.getCategories({
      _fields: CATEGORIES_FIELDS_FOR_SITEMAP.join(','),
    }),
  );

  const categories = await Promise.all(
    resCategories.data.map(async ({ slug, id }) => {
      const categoriesPagesPagination = await limit(() =>
        createCategoryPaginationSitemap(
          slug,
          PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY_PAGINATION][
            DEFAULT_LOCALE
          ],
          id,
        ),
      );

      return [
        createSitemapObject(
          createUrl(
            DEFAULT_LOCALE,
            PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY][
              DEFAULT_LOCALE
            ].replace('[categoryName]', slug),
          ),
        ),
        ...categoriesPagesPagination,
      ];
    }),
  );

  const categoriesPages = [
    mainProductsListingSitemap,
    ...mainProductsListingPaginationSitemap,
    ...(categories.flat() as unknown as MetadataRoute.Sitemap[]),
  ];

  return categoriesPages as unknown as MetadataRoute.Sitemap[];
};

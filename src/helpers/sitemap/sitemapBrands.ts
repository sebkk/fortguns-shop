import { MetadataRoute } from 'next';

import brandsAPI from '@/api/woocommerce/brands';
import { BRANDS_FIELDS_FOR_SITEMAP } from '@/constants/brands';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

const createBrandsSitemaps = async (): Promise<MetadataRoute.Sitemap[]> => {
  const brandPages = Object.entries(PATHNAMES[NAVIGATION_ROUTE.BRANDS]).map(
    ([locale, pathname]) => createSitemapObject(createUrl(locale, pathname)),
  ) as unknown as MetadataRoute.Sitemap[];

  const brands = await brandsAPI.getBrands({
    fields: BRANDS_FIELDS_FOR_SITEMAP.join(','),
  });

  const brandsPages = brands.data
    .map(({ slug, count }) => {
      const brandsPagesCount = Math.ceil(count / PER_PAGE_DEFAULT);

      const brandsPagesPagination = Array.from(
        { length: brandsPagesCount },
        (_, index) =>
          createSitemapObject(
            createUrl(
              DEFAULT_LOCALE,
              PATHNAMES[NAVIGATION_ROUTE.BRAND_LISTING_PAGINATION][
                DEFAULT_LOCALE
              ].replace('/[brandSlug]', `/${slug}`).replace(
                '[pageNumber]',
                (index + 1).toString(),
              ),
            ),
          ),
      ).filter((_, index) => index !== 0) as unknown as MetadataRoute.Sitemap[];

      return [
        createSitemapObject(
          createUrl(
            DEFAULT_LOCALE,
            PATHNAMES[NAVIGATION_ROUTE.BRAND_LISTING][DEFAULT_LOCALE].replace(
              '/[brandSlug]',
              `/${slug}`,
            ),
          ),
        ),
        ...brandsPagesPagination,
      ];
    })
    .flat() as unknown as MetadataRoute.Sitemap[];

  return [...brandPages, ...brandsPages];
};

export { createBrandsSitemaps };

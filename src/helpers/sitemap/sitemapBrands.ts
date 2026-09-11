import { MetadataRoute } from 'next';

import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { fetchBrands } from '@/handlers/brands/fetchBrands';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

const brandPath = (slug: string, page?: number) =>
  page
    ? PATHNAMES[NAVIGATION_ROUTE.BRAND_LISTING_PAGINATION][
        DEFAULT_LOCALE
      ].replace('[brandSlug]', slug).replace('[pageNumber]', page.toString())
    : PATHNAMES[NAVIGATION_ROUTE.BRAND_LISTING][DEFAULT_LOCALE].replace(
        '[brandSlug]',
        slug,
      );

/**
 * Sitemapa marek liczona z tego samego źródła, co lista na /marki.
 *
 * Wcześniej brała marki wprost z taksonomii WooCommerce i miało to dwa skutki.
 * Po pierwsze pobierała jedną stronę wyników, czyli sto marek ze stu
 * czterdziestu jeden — reszta alfabetu, z Rugerem, Sig Sauerem, Waltherem i
 * Winchesterem włącznie, nie trafiała do sitemapy wcale. Po drugie liczyła
 * strony paginacji z licznika taksonomii, który obejmuje także egzemplarze już
 * sprzedane: Beretta wychodziła na dwanaście stron, a ma pięć, więc sitemapa
 * zgłaszała Google adresy zwracające 404.
 *
 * Marki bez dostępnego towaru pomijamy, bo ich strony mają noindex — zgłaszanie
 * ich w sitemapie to sprzeczny sygnał.
 */
const createBrandsSitemaps = async (): Promise<MetadataRoute.Sitemap[]> => {
  const { brands } = await fetchBrands();

  return brands
    .filter(({ count }) => count > 0)
    .flatMap(({ slug, count }) => {
      const pagesCount = Math.ceil(count / PER_PAGE_DEFAULT);

      const paginationPages = Array.from(
        { length: Math.max(pagesCount - 1, 0) },
        (_, index) =>
          createSitemapObject(
            createUrl(DEFAULT_LOCALE, brandPath(slug, index + 2)),
          ),
      );

      return [
        createSitemapObject(createUrl(DEFAULT_LOCALE, brandPath(slug))),
        ...paginationPages,
      ];
    }) as unknown as MetadataRoute.Sitemap[];
};

export { createBrandsSitemaps };

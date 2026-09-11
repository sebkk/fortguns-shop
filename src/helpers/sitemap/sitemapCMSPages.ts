import { MetadataRoute } from 'next';

import pagesApi from '@/api/pages';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { fieldsStaticPathsForSitemap } from '@/constants/pages';
import { IWordPressPageStaticPathsForSitemap } from '@/types/pages';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

export const createCMSPagesSitemaps = async (): Promise<
  MetadataRoute.Sitemap[]
> => {
  const pages = await pagesApi.getPages<IWordPressPageStaticPathsForSitemap>({
    _fields: fieldsStaticPathsForSitemap,
    status: 'publish',
  });

  // ACF zapisuje ścieżki bez wiodącego ukośnika, PATHNAMES z nim — porównujemy
  // po obcięciu, żeby jedno z drugim w ogóle się spotkało.
  const stripSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '');

  // Strona robocza ma noindex i przekierowuje na stronę główną, a sitemapa nie
  // powinna zgłaszać ani jednego, ani drugiego.
  const excludedPathnames = new Set(
    [PATHNAMES[NAVIGATION_ROUTE.TEST_PAGES][DEFAULT_LOCALE]].map(stripSlashes),
  );

  const usablePages = pages
    .filter(({ acf }) => !!acf?.slugs_list)
    .map(({ acf }) => acf?.slugs_list)
    .filter(
      (slugs) =>
        !slugs?.some(({ pathname }) =>
          excludedPathnames.has(stripSlashes(pathname)),
        ),
    );

  const defaultPages: MetadataRoute.Sitemap[] = usablePages.map(
    (usablePage) => {
      const defaultLocalePathname = usablePage?.find(
        ({ locale }) => locale === DEFAULT_LOCALE,
      );

      return createSitemapObject(
        createUrl(
          defaultLocalePathname?.locale as string,
          defaultLocalePathname?.pathname as string,
        ),
      );
    },
  ) as unknown as MetadataRoute.Sitemap[];

  return defaultPages;
};

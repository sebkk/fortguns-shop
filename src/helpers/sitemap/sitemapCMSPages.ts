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

  // Strona robocza ma noindex i przekierowuje na stronę główną, a sitemapa nie
  // powinna zgłaszać ani jednego, ani drugiego.
  const excludedPathnames = [
    PATHNAMES[NAVIGATION_ROUTE.TEST_PAGES][DEFAULT_LOCALE],
  ];

  const usablePages = pages
    .filter(({ acf }) => !!acf?.slugs_list)
    .map(({ acf }) => acf?.slugs_list)
    .filter(
      (slugs) =>
        !slugs?.some(({ pathname }) => excludedPathnames.includes(pathname)),
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

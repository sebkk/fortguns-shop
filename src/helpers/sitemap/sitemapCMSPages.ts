import { MetadataRoute } from 'next';

import pagesApi from '@/api/pages';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { fieldsStaticPathsForSitemap } from '@/constants/pages';

import { createSitemapObject } from './createSitemapObject';
import { createUrl } from './createUrl';

export const createCMSPagesSitemaps = async (): Promise<
  MetadataRoute.Sitemap[]
> => {
  const pages = await pagesApi.getPages({
    _fields: fieldsStaticPathsForSitemap,
    status: 'publish',
  });

  const usablePages = pages
    .filter(({ acf }) => !!acf?.slugs_list)
    .map(({ acf }) => acf?.slugs_list);

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

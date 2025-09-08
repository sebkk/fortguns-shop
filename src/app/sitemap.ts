import { MetadataRoute } from 'next';

import pagesApi from '@/api/pages';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { fieldsStaticPathsForSitemap } from '@/constants/pages';

const createUrl = (locale: string, pathname: string) => {
  const fullPathname =
    locale === DEFAULT_LOCALE ? pathname : `${locale}/${pathname}`;

  return `${process.env.NEXT_PUBLIC_API_URL}/${fullPathname}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
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

      return {
        url: createUrl(
          defaultLocalePathname?.locale as string,
          defaultLocalePathname?.pathname as string,
        ),
        lastModified: new Date(),
        changefreq: 'daily',
        priority: 0.8,
      };
    },
  ) as unknown as MetadataRoute.Sitemap[];

  return defaultPages;
}

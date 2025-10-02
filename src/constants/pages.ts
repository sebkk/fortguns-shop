import { DEFAULT_LOCALE, PATHNAMES } from './locales';
import { NAVIGATION_ROUTE } from './navigation';

export const fields = ['title', 'acf.layout', 'slug', 'link', 'acf'].join(',');

export const fieldsMetadata = ['link', 'rank_math_seo'];

export const fieldsRewrites = [
  'acf.source',
  'acf.destination',
  'acf.slugs_list',
  'slug',
].join(',');

export const fieldsStaticPaths = ['acf.slugs_list', 'acf.destination'].join(
  ',',
);

export const fieldsStaticPathsForSitemap = ['acf.slugs_list'].join(',');

export const fieldsFaqPage = ['acf.sections'].join(',');

export const PAGES_SLUGS = {
  [NAVIGATION_ROUTE.BRANDS]:
    PATHNAMES[NAVIGATION_ROUTE.BRANDS][DEFAULT_LOCALE].slice(1),
  [NAVIGATION_ROUTE.HOMEPAGE]: 'home',
  [NAVIGATION_ROUTE.PRODUCTS_LISTING]:
    PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].slice(1),
};

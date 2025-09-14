import { PATHNAMES } from '../locales';
import { NAVIGATION_ROUTE } from '../navigation';
import { HOMEPAGE_BREADCRUMB } from './homepage';

const BRANDS_BREADCRUMB = {
  label: 'breadcrumbsBrands',
  href: PATHNAMES[NAVIGATION_ROUTE.BRANDS],
  shouldTranslate: true,
};

export const BRAND_LISTING_BREADCRUMB = (brandName: string) => ({
  label: brandName,
  isActive: true,
  shouldTranslate: false,
});

export const BRANDS_BREADCRUMBS = [HOMEPAGE_BREADCRUMB, BRANDS_BREADCRUMB];

export const BRAND_LISTING_BREADCRUMBS = (brandName: string) => [
  HOMEPAGE_BREADCRUMB,
  BRANDS_BREADCRUMB,
  BRAND_LISTING_BREADCRUMB(brandName),
];

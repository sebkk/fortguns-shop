import { PATHNAMES } from '../locales';
import { NAVIGATION_ROUTE } from '../navigation';
import { HOMEPAGE_BREADCRUMB } from './homepage';

const BRANDS_BREADCRUMB = {
  label: 'breadcrumbsBrands',
  href: PATHNAMES[NAVIGATION_ROUTE.BRANDS],
  shouldTranslate: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BRAND_LISTING_BREADCRUMB = (brandName: any) => ({
  label: brandName,
  isActive: true,
  shouldTranslate: false,
});

export const BRANDS_BREADCRUMBS = [HOMEPAGE_BREADCRUMB, BRANDS_BREADCRUMB];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BRAND_LISTING_BREADCRUMBS = (brandName: any) => [
  HOMEPAGE_BREADCRUMB,
  BRANDS_BREADCRUMB,
  BRAND_LISTING_BREADCRUMB(brandName),
];

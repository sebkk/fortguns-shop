import { PATHNAMES } from '../locales';
import { NAVIGATION_ROUTE } from '../navigation';
import { HOMEPAGE_BREADCRUMB } from './homepage';

export const PRODUCTS_BREADCRUMB = {
  label: 'breadcrumbsProductsListing',
  href: PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING],
  shouldTranslate: true,
};

export const PRODUCTS_CATEGORY_BREADCRUMB = (categoryName: string) => ({
  label: categoryName,
  isActive: true,
  shouldTranslate: false,
});

export const PRODUCT_DETAILS_BREADCRUMB = (productName: string) => ({
  label: productName,
  isActive: true,
  shouldTranslate: false,
});

export const PRODUCTS_BREADCRUMBS = [HOMEPAGE_BREADCRUMB, PRODUCTS_BREADCRUMB];

export const PRODUCT_DETAILS_BREADCRUMBS = [
  HOMEPAGE_BREADCRUMB,
  PRODUCTS_BREADCRUMB,
];

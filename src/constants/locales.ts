import { NAVIGATION_ROUTE } from './navigation';

export const DEFAULT_LOCALE = 'pl';

export const LOCALES = [DEFAULT_LOCALE];

// TODO: FETCH PAGES AND GENERATE
export const PATHNAMES = {
  '/': {
    pl: '/',
    en: '/',
  },
  [NAVIGATION_ROUTE.PRODUCT_DETAILS]: {
    pl: '/produkt/[productSlug]',
    en: NAVIGATION_ROUTE.PRODUCT_DETAILS,
  },
  [NAVIGATION_ROUTE.PRODUCTS_LISTING]: {
    pl: '/produkty',
    en: NAVIGATION_ROUTE.PRODUCTS_LISTING,
  },
  [NAVIGATION_ROUTE.PRODUCTS_LISTING_PAGINATION]: {
    pl: '/produkty/[pageNumber]',
    en: NAVIGATION_ROUTE.PRODUCTS_LISTING_PAGINATION,
  },
  [NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY]: {
    pl: '/produkty/kategoria/[categoryName]',
    en: NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY,
  },
  [NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY_PAGINATION]: {
    pl: '/produkty/kategoria/[categoryName]/[pageNumber]',
    en: NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY_PAGINATION,
  },
  [NAVIGATION_ROUTE.BRANDS]: {
    pl: '/marki',
    en: NAVIGATION_ROUTE.BRANDS,
  },
  [NAVIGATION_ROUTE.BRAND_LISTING]: {
    pl: '/marki/[brandSlug]',
    en: NAVIGATION_ROUTE.BRAND_LISTING,
  },
  [NAVIGATION_ROUTE.BRAND_LISTING_PAGINATION]: {
    pl: '/marki/[brandSlug]/[pageNumber]',
    en: NAVIGATION_ROUTE.BRAND_LISTING_PAGINATION,
  },
};

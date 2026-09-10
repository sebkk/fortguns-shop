import { NAVIGATION_ROUTE } from '@/constants/navigation';

import { getCanonicalPath } from './canonical';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fortguns.pl'
).replace(/\/+$/, '');

const CMS_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? '').host;
  } catch {
    return 'cms.fortguns.pl';
  }
})();

/** Paths WordPress actually serves — uploads and API stay on the CMS host. */
const CMS_OWNED_PREFIXES = [
  '/wp-content/',
  '/wp-json/',
  '/wp-admin/',
  '/wp-includes/',
];

/**
 * A CMS permalink differs from the public route in more than the host:
 * WooCommerce keeps products under /product/ and nests categories under
 * /product-category/[parent]/[child]/, while the frontend uses the Polish
 * paths from PATHNAMES.
 */
const cmsPathToPublicPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);

  if (!segments.length) return '/';

  const [base, ...rest] = segments;

  if (base === 'product' && rest[0]) {
    return getCanonicalPath(NAVIGATION_ROUTE.PRODUCT_DETAILS, {
      productSlug: rest[0],
    });
  }

  // Woo nests categories; the listing route is keyed by the leaf alone.
  if (base === 'product-category' && rest.length) {
    return getCanonicalPath(NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY, {
      categoryName: rest[rest.length - 1],
    });
  }

  return `/${segments.join('/')}`;
};

/**
 * Rank Math sometimes prepends the CMS subdomain to a URL that already carries
 * it, producing cms.cms.fortguns.pl — a host that does not resolve, which is
 * how the Organization logo and the breadcrumb root end up broken.
 */
const collapseDoubledHost = (host: string) => {
  const [subdomain] = CMS_HOST.split('.');

  return host.replace(new RegExp(`^(?:${subdomain}\\.)+`), `${subdomain}.`);
};

/**
 * Rewrites a CMS URL to the public one it corresponds to. Anything that is not
 * a CMS page URL — an upload, an external link, a plain string — is returned
 * untouched.
 */
export const toPublicUrl = (value: string): string => {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return value;
  }

  url.host = collapseDoubledHost(url.host);

  if (url.host !== CMS_HOST) return value;

  // Uploads keep living on the CMS, but the host may still have needed fixing.
  if (CMS_OWNED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix)))
    return url.toString();

  return `${SITE_URL}${cmsPathToPublicPath(url.pathname)}${url.search}${url.hash}`;
};

/** Applies toPublicUrl to every string in a JSON-shaped value. */
export const withPublicUrls = <T>(value: T): T => {
  if (typeof value === 'string') return toPublicUrl(value) as T;

  if (Array.isArray(value)) return value.map(withPublicUrls) as T;

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, withPublicUrls(item)]),
    ) as T;
  }

  return value;
};

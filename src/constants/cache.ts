export const PUBLIC_API_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=60',
  'Vercel-CDN-Cache-Control': 'max-age=300, stale-while-revalidate=3600',
};

export const API_SEARCH_MAX_PER_PAGE = 100;
export const API_SEARCH_MAX_QUERY_LENGTH = 100;

export const PRODUCTS_DATA_REVALIDATE = 7200;
export const CMS_DATA_REVALIDATE = 86400;

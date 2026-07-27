import { IBrand, IGetBrandsParams } from '@/types/brands';

/**
 * Brand lookup for the search dropdown (Client Components), proxied through
 * the Next.js API route to avoid CORS.
 *
 * Deliberately fetches a single page: the dropdown shows a handful of brands
 * and takes the totals from the response headers. It used to walk every page
 * of results, so a one-letter query fired a dozen requests to render three
 * chips. The brands listing page has its own server-side fetcher.
 */
export const fetchSearchBrandsFromAPI = async ({
  params = {},
}: {
  params?: IGetBrandsParams;
} = {}): Promise<{
  brands: IBrand[];
  totalPages: number;
  totalBrands: number;
}> => {
  try {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.set('search', params.search);
    if (params.fields) searchParams.set('fields', params.fields);
    if (params.per_page)
      searchParams.set('per_page', params.per_page.toString());
    if (params.page) searchParams.set('page', params.page.toString());

    const response = await fetch(
      `/api/search/brands?${searchParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const brands: IBrand[] = await response.json();

    return {
      brands,
      totalBrands: parseInt(response.headers.get('X-WP-Total') || '0', 10),
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '0', 10),
    };
  } catch (error) {
    console.error('Error fetching brands from API:', error);

    return { brands: [], totalPages: 0, totalBrands: 0 };
  }
};

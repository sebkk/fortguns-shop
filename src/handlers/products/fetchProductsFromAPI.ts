import { PER_PAGE_DEFAULT } from '@/constants/products';
import { IGetProductsParams } from '@/types/product';

/**
 * Fetch products from Next.js API route (for Client Components)
 * This avoids CORS issues by proxying requests through Next.js server
 */
export const fetchProductsFromAPI = async <T>({
  params,
}: {
  params: IGetProductsParams;
}): Promise<{
  products: T[];
  totalPages: number;
  totalProducts: number;
}> => {
  try {
    // Build query string
    const searchParams = new URLSearchParams();
    if (params.search) {
      searchParams.set('search', params.search);
    }
    if (params._fields) {
      searchParams.set('_fields', params._fields);
    }
    if (params.per_page) {
      searchParams.set('per_page', params.per_page.toString());
    }
    if (params.page) {
      searchParams.set('page', params.page.toString());
    }

    // Set default per_page if not provided
    if (!params.per_page) {
      searchParams.set('per_page', PER_PAGE_DEFAULT.toString());
    }

    // Fetch from Next.js API route
    const response = await fetch(
      `/api/search/products?${searchParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products: T[] = await response.json();
    const totalProducts = parseInt(
      response.headers.get('X-WP-Total') || '0',
      10,
    );
    const totalPages = parseInt(
      response.headers.get('X-WP-TotalPages') || '0',
      10,
    );

    return {
      products,
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error('Error fetching products from API:', error);

    return {
      products: [],
      totalPages: 0,
      totalProducts: 0,
    };
  }
};

import { IBrand, IGetBrandsParams, IGroupedBrands } from '@/types/brands';

const groupBrandsByFirstLetter = (brands: IBrand[]): IGroupedBrands[] => {
  const grouped = brands.reduce(
    (acc, brand) => {
      const firstLetter = brand.name.charAt(0).toUpperCase();

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      acc[firstLetter].push(brand);
      return acc;
    },
    {} as Record<string, IBrand[]>,
  );

  return Object.keys(grouped)
    .sort()
    .map((letter) => ({
      letter,
      brands: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

/**
 * Fetch brands from Next.js API route (for Client Components)
 * This avoids CORS issues by proxying requests through Next.js server
 */
export const fetchSearchBrandsFromAPI = async ({
  params = {},
}: {
  params?: IGetBrandsParams;
} = {}): Promise<{
  brands: IBrand[];
  groupedBrands: IGroupedBrands[];
  totalPages: number;
  totalBrands: number;
}> => {
  let brands: IBrand[] = [];

  try {
    // Build query string
    const searchParams = new URLSearchParams();
    if (params.search) {
      searchParams.set('search', params.search);
    }
    if (params.fields) {
      searchParams.set('fields', params.fields);
    }
    if (params.per_page) {
      searchParams.set('per_page', params.per_page.toString());
    }
    if (params.page) {
      searchParams.set('page', params.page.toString());
    }

    // Fetch from Next.js API route
    const response = await fetch(
      `/api/search/brands?${searchParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const firstPageData: IBrand[] = await response.json();
    const totalBrands = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(
      response.headers.get('X-WP-TotalPages') || '0',
      10,
    );

    if (totalPages > 1) {
      brands = [...firstPageData];

      // Fetch remaining pages
      const remainingPages = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2,
      );

      const remainingPagesData = await Promise.all(
        remainingPages.map(async (page) => {
          const pageParams = new URLSearchParams(searchParams.toString());
          pageParams.set('page', page.toString());
          const pageResponse = await fetch(
            `/api/search/brands?${pageParams.toString()}`,
          );
          if (!pageResponse.ok) {
            throw new Error(`Failed to fetch brands page ${page}`);
          }
          return pageResponse.json();
        }),
      );

      remainingPagesData.forEach((pageData: IBrand[]) => {
        brands = [...brands, ...pageData];
      });
    } else {
      brands = firstPageData;
    }

    const groupedBrands = groupBrandsByFirstLetter(brands);

    return {
      brands,
      groupedBrands,
      totalPages,
      totalBrands,
    };
  } catch (error) {
    console.error('Error fetching brands from API:', error);

    return {
      brands,
      groupedBrands: [],
      totalPages: 0,
      totalBrands: 0,
    };
  }
};

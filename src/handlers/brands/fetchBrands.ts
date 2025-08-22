import brandsAPI from '@/api/woocommerce/brands';
import { IBrand, IGetBrandsParams } from '@/types/brands';

export const fetchBrands = async ({
  params = {},
}: {
  params?: IGetBrandsParams;
} = {}): Promise<{
  brands: IBrand[];
  totalPages: number;
  totalProducts: number;
}> => {
  let brands: IBrand[] = [];

  try {
    const { data: firstPageData, headers } = await brandsAPI.getBrands(params);

    const totalProducts = parseInt(headers['x-wp-total'] || '0', 10);
    const totalPages = parseInt(headers['x-wp-totalpages'] || '0', 10);

    if (totalPages > 1) {
      brands = [...firstPageData];

      const remainingPages = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2,
      );

      const remainingPagesData = await Promise.all(
        remainingPages.map((page) => brandsAPI.getBrands({ ...params, page })),
      );

      remainingPagesData.forEach((response) => {
        brands = [...brands, ...response.data];
      });
    } else {
      brands = firstPageData;
    }

    return {
      brands,
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error('Error fetching brands:', error);

    return {
      brands,
      totalPages: 0,
      totalProducts: 0,
    };
  }
};

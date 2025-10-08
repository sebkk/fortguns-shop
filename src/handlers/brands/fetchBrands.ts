import { AxiosResponse } from 'axios';

import customAPI from '@/api/custom';
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

export const fetchBrands = async ({
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
    const { data: firstPageData, headers } = await customAPI.getBrands(params);

    const totalBrands = parseInt(headers['x-wp-total'] || '0', 10);
    const totalPages = parseInt(headers['x-wp-totalpages'] || '0', 10);

    if (totalPages > 1) {
      brands = [...firstPageData];

      const remainingPages = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2,
      );

      const remainingPagesData = await Promise.all(
        remainingPages.map((page) => customAPI.getBrands({ ...params, page })),
      );

      remainingPagesData.forEach((response: AxiosResponse<IBrand[]>) => {
        brands = [...brands, ...response.data];
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
    console.error('Error fetching brands:', error);

    return {
      brands,
      groupedBrands: [],
      totalPages: 0,
      totalBrands: 0,
    };
  }
};

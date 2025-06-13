import categoriesApi from '@/api/woocommerce/categories';
import { ICategory } from '@/types/categories';

export const fetchCategoryBySlug = async ({
  slug,
  id,
}: {
  slug?: string;
  id?: number;
}): Promise<{
  category?: ICategory;
}> => {
  try {
    let category = undefined;

    if (slug) {
      const res = await categoriesApi.getCategories({ slug });

      category = res.data.find((category) => category.slug === slug);
    }

    if (id) {
      const res = await categoriesApi.getCategoryById(id);

      category = res.data;
    }

    return {
      category,
    };
  } catch (error) {
    console.error(error);

    return {
      category: undefined,
    };
  }
};

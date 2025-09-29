import categoriesApi from '@/api/woocommerce/categories';
import { IBreadcrumbItem } from '@/components/Breadcrumbs';
import { CATEGORIES_FIELDS_FOR_LISTING } from '@/constants/categories';
import { ICategory, IGetCategoriesParams } from '@/types/categories';

import { createCategoryBreadcrumb } from './fetchCategoryBreadcrumbs';

export const fetchCategoryBySlug = async ({
  slug,
  id,
  params,
}: {
  slug?: string;
  id?: number;
  params?: IGetCategoriesParams;
}): Promise<{
  category?: ICategory;
  breadcrumbs?: IBreadcrumbItem[];
}> => {
  try {
    let category = undefined;

    if (slug) {
      const res = await categoriesApi.getCategories({
        slug,
        _fields: CATEGORIES_FIELDS_FOR_LISTING.join(','),
        ...params,
      });
      category = res.data.find((category) => category.slug === slug);
    }

    if (id) {
      const res = await categoriesApi.getCategoryById(id, {
        _fields: CATEGORIES_FIELDS_FOR_LISTING.join(','),
        ...params,
      });

      category = res.data;
    }
    const breadcrumbs = await createCategoryBreadcrumb(category as ICategory);

    return {
      category,
      breadcrumbs,
    };
  } catch (error) {
    console.error(error);

    return {
      category: undefined,
      breadcrumbs: [],
    };
  }
};

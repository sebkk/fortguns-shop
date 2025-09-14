import categoriesAPI from '@/api/woocommerce/categories';
import { IBreadcrumbItem } from '@/components/Breadcrumbs/types';
import {
  PRODUCTS_BREADCRUMBS,
  PRODUCTS_CATEGORY_BREADCRUMB,
} from '@/constants/breadcrumbs/products';
import { CATEGORIES_FIELDS_FOR_BREADCRUMBS } from '@/constants/categories';
import { createProductsCategoryBreadcrumb } from '@/helpers/breadcrumbs/createProductsCategoryBreadcrumbs';
import { ICategory } from '@/types/categories';

export const fetchCategoryBreadcrumbs = async ({
  parentId,
  breadcrumbs,
}: {
  parentId: number;
  breadcrumbs: IBreadcrumbItem[];
}) => {
  if (!parentId) return;

  try {
    const response = await categoriesAPI.getCategoryById(parentId, {
      _fields: CATEGORIES_FIELDS_FOR_BREADCRUMBS.join(','),
    });
    const category = response.data;

    const { name, slug, parent } = category || {};

    const categoryBreadcrumb = createProductsCategoryBreadcrumb(
      name,
      slug,
    ) as IBreadcrumbItem;

    breadcrumbs.unshift(categoryBreadcrumb);

    await fetchCategoryBreadcrumbs({ parentId: parent, breadcrumbs });
  } catch (error) {
    console.error(error);
  }
};

export const createCategoryBreadcrumb = async (category: ICategory) => {
  const breadcrumbs: IBreadcrumbItem[] = [];

  if (!category) return [...PRODUCTS_BREADCRUMBS];

  const { name } = category || {};

  const lastCategoryBreadcrumb = PRODUCTS_CATEGORY_BREADCRUMB(
    name,
  ) as IBreadcrumbItem;

  breadcrumbs.push(lastCategoryBreadcrumb);

  await fetchCategoryBreadcrumbs({ parentId: category.parent, breadcrumbs });

  return [...PRODUCTS_BREADCRUMBS, ...breadcrumbs];
};

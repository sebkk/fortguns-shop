import { IBreadcrumbItem } from '@/components/Breadcrumbs';
import {
  PRODUCT_DETAILS_BREADCRUMB,
  PRODUCT_DETAILS_BREADCRUMBS,
} from '@/constants/breadcrumbs/products';
import { IProductCategory } from '@/types/product';

import { createProductsCategoryBreadcrumb } from './createProductsCategoryBreadcrumbs';

export const createProductDetailsBreadcrumbs = (
  productName: string,
  categories: IProductCategory[],
) => {
  const breadcrumbs: IBreadcrumbItem[] = [...PRODUCT_DETAILS_BREADCRUMBS];

  categories.forEach(({ name, slug }) => {
    breadcrumbs.push(
      createProductsCategoryBreadcrumb(name, slug) as IBreadcrumbItem,
    );
  });

  breadcrumbs.push(PRODUCT_DETAILS_BREADCRUMB(productName) as IBreadcrumbItem);

  return breadcrumbs;
};

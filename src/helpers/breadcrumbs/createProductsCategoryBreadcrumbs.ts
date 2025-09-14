import { IBreadcrumbItem } from '@/components/Breadcrumbs';
import { PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';

export const createProductsCategoryBreadcrumb = (
  categoryName: string,
  slug: string,
): IBreadcrumbItem => ({
  label: categoryName,
  shouldTranslate: false,
  href: Object.entries(PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING_CATEGORY])
    .map(([locale, path]) => [locale, path.replace('[categoryName]', slug)])
    .reduce(
      (acc, [locale, path]) => ({ ...acc, [locale]: path }),
      {} as { [key: string]: string },
    ) as IBreadcrumbItem['href'],
});

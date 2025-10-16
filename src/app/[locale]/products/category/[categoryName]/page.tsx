import { notFound } from 'next/navigation';

import categoriesApi from '@/api/woocommerce/categories';
import { Breadcrumbs, IBreadcrumbItem } from '@/components/Breadcrumbs';
import { CATEGORIES_FIELDS_FOR_STATIC_PARAMS } from '@/constants/categories';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { getCategoryProductMetadata } from '@/handlers/products/getCategoryProductMetadata';
import { IProductListing } from '@/types/product';

interface ICategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
}

export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const res = await categoriesApi.getCategories({
    _fields: CATEGORIES_FIELDS_FOR_STATIC_PARAMS.join(','),
  });

  return res.data.map((category) => ({
    locale: DEFAULT_LOCALE,
    categoryName: category.slug,
  }));
};

export const generateMetadata = async ({ params }: ICategoryPageProps) => {
  const { categoryName } = await params;

  const { metadata } = await getCategoryProductMetadata(categoryName);

  return metadata;
};

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { categoryName } = await params;

  const { category, breadcrumbs } = await fetchCategoryBySlug({
    slug: categoryName,
  });

  if (!category) {
    return notFound();
  }

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        category: category?.id.toString(),
      },
    });

  return (
    <>
      <Breadcrumbs items={breadcrumbs as IBreadcrumbItem[]} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        category={category}
      />
    </>
  );
};

export default CategoryPage;

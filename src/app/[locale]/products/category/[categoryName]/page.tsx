import { notFound } from 'next/navigation';

import categoriesApi from '@/api/woocommerce/categories';
import { IBreadcrumbItem } from '@/components/Breadcrumbs';
import { BreadcrumbsServer } from '@/components/Breadcrumbs/BreadcrumbsServer';
import { CATEGORIES_FIELDS_FOR_STATIC_PARAMS } from '@/constants/categories';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { ProductsServer } from '@/features/products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { getCategoryProductMetadata } from '@/handlers/products/getCategoryProductMetadata';
import { IProductListing } from '@/types/product';

interface ICategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 600;

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
      <BreadcrumbsServer
        items={breadcrumbs as IBreadcrumbItem[]}
        size='large'
      />
      <ProductsServer
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        category={category}
      />
    </>
  );
};

export default CategoryPage;

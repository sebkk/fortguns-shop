import { notFound } from 'next/navigation';

import categoriesApi from '@/api/woocommerce/categories';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';

interface ICategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 600;

export const generateStaticParams = async () => {
  const res = await categoriesApi.getCategories();

  return res.data.map((category) => ({
    locale: DEFAULT_LOCALE,
    categoryName: category.slug,
  }));
};

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { categoryName } = await params;

  const { category } = await fetchCategoryBySlug({ slug: categoryName });

  if (!category) {
    notFound();
  }

  const { products, totalPages, totalProducts } = await fetchProducts({
    params: {
      per_page: 12,
      page: 1,
      category: category?.id.toString(),
    },
  });

  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={1}
      category={category}
    />
  );
};

export default CategoryPage;

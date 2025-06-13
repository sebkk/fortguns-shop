import { notFound } from 'next/navigation';

import categoriesApi from '@/api/woocommerce/categories';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';

interface ICategoryPageProps {
  params: Promise<{
    categoryName: string;
  }>;
}

export const config = {
  revalidate: 600,
  dynamicParams: false,
};

export const generateStaticParams = async () => {
  const res = await categoriesApi.getCategories();
  return res.data.map((category) => ({
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

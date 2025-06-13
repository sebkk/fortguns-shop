import categoriesApi from '@/api/woocommerce/categories';
import { REVALIDATE_TIME } from '@/constants/fetching';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { notFound } from 'next/navigation';

interface IProductCategoryPaginationPageProps {
  params: Promise<{
    categoryName: string;
    pageNumber: string;
  }>;
}

export const dynamicParams = true;
export const revalidate = REVALIDATE_TIME;

export const generateStaticParams = async () => {
  const res = await categoriesApi.getCategories();
  return res.data.map((category) => ({
    categoryName: category.slug,
  }));
};

const ProductCategoryPaginationPage = async ({
  params,
}: IProductCategoryPaginationPageProps) => {
  const { categoryName, pageNumber } = await params;

  const { category } = await fetchCategoryBySlug({ slug: categoryName });

  if (!category) {
    notFound();
  }

  const { products, totalPages, totalProducts } = await fetchProducts({
    params: {
      per_page: 12,
      page: pageNumber ? +pageNumber : 1,
      category: category?.id.toString(),
    },
  });
  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={+pageNumber}
      category={category}
    />
  );
};

export default ProductCategoryPaginationPage;

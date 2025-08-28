import { notFound } from 'next/navigation';

import categoriesApi from '@/api/woocommerce/categories';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

interface IProductCategoryPaginationPageProps {
  params: Promise<{
    locale: string;
    categoryName: string;
    pageNumber: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 600;

export const generateStaticParams = async () => {
  const res = await categoriesApi.getCategories();

  return res.data.map((category) => ({
    locale: DEFAULT_LOCALE,
    categoryName: category.slug,
    pageNumber: '1',
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

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
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

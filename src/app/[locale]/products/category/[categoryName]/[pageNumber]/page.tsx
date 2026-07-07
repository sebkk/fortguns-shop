import { notFound } from 'next/navigation';

import { Breadcrumbs, IBreadcrumbItem } from '@/components/Breadcrumbs';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { fetchCategoryBySlug } from '@/handlers/products/fetchCategoryBySlug';
import { cachedFetchProducts } from '@/handlers/products/fetchProducts';
import { getCategoryProductMetadata } from '@/handlers/products/getCategoryProductMetadata';
import {
  getValidPaginationPage,
  isPaginationPageOutOfRange,
} from '@/helpers/pagination';
import { IProductListing } from '@/types/product';

interface IProductCategoryPaginationPageProps {
  params: Promise<{
    locale: string;
    categoryName: string;
    pageNumber: string;
  }>;
}

export const dynamic = 'force-static';
export const revalidate = 7200;

// export const generateStaticParams = async () => {
//   const res = await categoriesApi.getCategories();

//   return res.data.map((category) => ({
//     locale: DEFAULT_LOCALE,
//     categoryName: category.slug,
//     pageNumber: '1',
//   }));
// };

export const generateMetadata = async ({
  params,
}: IProductCategoryPaginationPageProps) => {
  const { categoryName, pageNumber } = await params;

  if (!getValidPaginationPage(pageNumber)) {
    notFound();
  }

  const { metadata } = await getCategoryProductMetadata(categoryName);

  return metadata;
};

const ProductCategoryPaginationPage = async ({
  params,
}: IProductCategoryPaginationPageProps) => {
  const { categoryName, pageNumber } = await params;
  const page = getValidPaginationPage(pageNumber);

  if (!page) {
    notFound();
  }

  const { category, breadcrumbs } = await fetchCategoryBySlug({
    slug: categoryName,
  });

  if (!category) {
    notFound();
  }

  const { products, totalPages, totalProducts } =
    await cachedFetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page,
        category: category?.id.toString(),
      },
    });

  if (isPaginationPageOutOfRange(page, totalPages)) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs as IBreadcrumbItem[]} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageNumber={page}
        category={category}
      />
    </>
  );
};

export default ProductCategoryPaginationPage;

import { notFound } from 'next/navigation';

import { BreadcrumbsServer } from '@/components/Breadcrumbs/BreadcrumbsServer';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { ProductsServer } from '@/features/products';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

interface IProductPagePaginationProps {
  params: Promise<{ pageNumber: string }>;
}

export const dynamic = 'force-dynamic';

const ProductPagePagination = async ({
  params,
}: IProductPagePaginationProps) => {
  const { pageNumber } = await params;

  if (isNaN(+pageNumber)) {
    notFound();
  }

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page: pageNumber ? +pageNumber : 1,
      },
    });

  return (
    <>
      <BreadcrumbsServer items={PRODUCTS_BREADCRUMBS} size='large' />
      <ProductsServer
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageNumber={+pageNumber}
      />
    </>
  );
};

export default ProductPagePagination;

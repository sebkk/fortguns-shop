import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
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
      <Breadcrumbs items={PRODUCTS_BREADCRUMBS} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageNumber={+pageNumber}
      />
    </>
  );
};

export default ProductPagePagination;

import { notFound } from 'next/navigation';

import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';

interface IProductPagePaginationProps {
  params: Promise<{ pageNumber: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 3600;

const ProductPagePagination = async ({
  params,
}: IProductPagePaginationProps) => {
  const { pageNumber } = await params;

  if (isNaN(+pageNumber)) {
    notFound();
  }

  const { products, totalPages, totalProducts } = await fetchProducts({
    params: { per_page: 12, page: pageNumber ? +pageNumber : 1 },
  });

  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={+pageNumber}
    />
  );
};

export default ProductPagePagination;

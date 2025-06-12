import { Products } from '@/features/products/Products';

interface IProductsPageProps {
  params: {
    pageNumber: string;
  };
}

const ProductsPagePagination = async ({ params }: IProductsPageProps) => {
  const pageNumber = Number(params.pageNumber);

  return <Products pageNumber={pageNumber} />;
};

export default ProductsPagePagination;

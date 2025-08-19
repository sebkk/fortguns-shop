import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';

export const revalidate = 600;
export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  return [];
};

const ProductsPage = async () => {
  const { products, totalPages, totalProducts } = await fetchProducts({
    params: {
      per_page: 12,
      page: 1,
    },
  });

  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={1}
    />
  );
};

export default ProductsPage;

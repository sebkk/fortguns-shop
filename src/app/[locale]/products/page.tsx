import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';

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

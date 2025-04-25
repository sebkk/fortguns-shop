import products from '@/api/woocommerce/products';
import { ProductCard } from '@/components/ProductCard';

const ProductsPage = async () => {
  const fetchProducts = async () => {
    try {
      const res = await products.getProducts();

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const productsData = await fetchProducts();

  console.log(productsData);

  return (
    <div>
      <ul className='grid grid-cols-3 gap-3'>
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

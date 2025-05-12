import products from '@/api/woocommerce/products';
import { ProductCard } from '@/components/ProductCard';
import { Spacer } from '@/components/Spacer';

const ProductsPage = async () => {
  const fetchProducts = async () => {
    try {
      const res = await products.getProducts();

      return { data: res.data, totalPages: res.headers['x-wp-total'] || 0 };
    } catch (err) {
      console.error(err);
    }
  };

  const { data: productsData, totalPages } = (await fetchProducts()) || {};

  console.log(productsData);

  return (
    <>
      <Spacer />
      <div className='bg-background-light'>
        <div className='container flex justify-between px-6 py-4'>
          <p className='text-xl'>{`${totalPages} products`}</p>
        </div>
      </div>
      <div className='container flex flex-col px-4'>
        <Spacer size='md' />
        <ul className='grid grid-cols-4 gap-3'>
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductsPage;

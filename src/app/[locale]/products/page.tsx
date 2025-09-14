import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

export const revalidate = 600;
export const dynamic = 'force-static';

const ProductsPage = async () => {
  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page: 1,
      },
    });

  return (
    <>
      <Breadcrumbs items={PRODUCTS_BREADCRUMBS} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
      />
    </>
  );
};

export default ProductsPage;

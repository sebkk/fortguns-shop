import brandsAPI from '@/api/woocommerce/brands';
import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';

export const revalidate = 600;
export const dynamic = 'force-static';

const BrandListingPage = async ({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) => {
  const { brandSlug } = await params;
  const { data } = await brandsAPI.getBrand(brandSlug);
  const [brand] = data;

  const {
    id: brandId,
    name: brandName,
    description: brandDescription,
  } = brand || {};

  const { products, totalPages, totalProducts } = await fetchProducts({
    params: {
      brand: brandId,
      stock_status: undefined,
    },
  });

  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={1}
      pageTitle={brandName}
      pageDescription={brandDescription}
      brandId={brandId}
    />
  );
};

export default BrandListingPage;

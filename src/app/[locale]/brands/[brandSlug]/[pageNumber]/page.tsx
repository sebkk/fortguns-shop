import brandsAPI from '@/api/woocommerce/brands';
import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

export const revalidate = 600;
export const dynamic = 'force-static';

const BrandListingPageNavigation = async ({
  params,
}: {
  params: Promise<{ brandSlug: string; pageNumber: string }>;
}) => {
  const { brandSlug, pageNumber } = await params;
  const { data } = await brandsAPI.getBrand(brandSlug);
  const [brand] = data;

  const {
    id: brandId,
    name: brandName,
    description: brandDescription,
  } = brand || {};

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        brand: brandId,
        stock_status: undefined,
        page: +pageNumber,
      },
    });

  return (
    <Products
      products={products}
      totalPages={totalPages}
      totalProducts={totalProducts}
      pageNumber={+pageNumber}
      pageTitle={brandName}
      pageDescription={brandDescription}
      brandId={brandId}
    />
  );
};

export default BrandListingPageNavigation;

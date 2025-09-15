import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { BRAND_LISTING_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { Products } from '@/features/products/Products';
import { fetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';

export const dynamic = 'force-dynamic';
// export const revalidate = 600;

const BrandListingPageNavigation = async ({
  params,
}: {
  params: Promise<{ brandSlug: string; pageNumber: string }>;
}) => {
  const { brandSlug, pageNumber } = await params;

  const { brand, products, totalPages, totalProducts } = await fetchBrandBySlug(
    brandSlug,
    {
      productParams: {
        page: +pageNumber,
      },
    },
  );

  const {
    name: brandName,
    description: brandDescription,
    id: brandId,
  } = brand || {};

  return (
    <>
      <Breadcrumbs
        items={BRAND_LISTING_BREADCRUMBS(brandName as string)}
        size='large'
      />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageNumber={+pageNumber}
        pageTitle={brandName}
        pageDescription={brandDescription}
        brandId={brandId}
      />
    </>
  );
};

export default BrandListingPageNavigation;

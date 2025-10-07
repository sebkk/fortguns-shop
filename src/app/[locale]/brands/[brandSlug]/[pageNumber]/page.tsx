import brandsAPI from '@/api/woocommerce/brands';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { BRANDS_FIELDS_FOR_METADATA } from '@/constants/brands';
import { BRAND_LISTING_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { Products } from '@/features/products/Products';
import { fetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';

export const dynamic = 'force-static';
export const revalidate = 600;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) => {
  const { brandSlug } = await params;

  const response = await brandsAPI.getBrand(brandSlug, {
    fields: BRANDS_FIELDS_FOR_METADATA.join(','),
  });
  const { data } = response || {};

  const [brand] = data;

  const { name: brandName, description: brandDescription } = brand || {};

  return {
    title: `Fortguns - ${brandName}`,
    description: brandDescription,
    keywords: brandName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${PATHNAMES[NAVIGATION_ROUTE.BRAND_LISTING]}/${brandSlug}`,
    breadcrumbs: BRAND_LISTING_BREADCRUMBS(brandName as string),
  };
};

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

import brandsAPI from '@/api/woocommerce/brands';
import { BreadcrumbsServer } from '@/components/Breadcrumbs/BreadcrumbsServer';
import { Spacer } from '@/components/Spacer';
import { BRANDS_FIELDS_FOR_STATIC_PARAMS } from '@/constants/brands';
import { BRAND_LISTING_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { ProductsServer } from '@/features/products';
import { fetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';

export const revalidate = 600;
export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const res = await brandsAPI.getBrands({
    fields: BRANDS_FIELDS_FOR_STATIC_PARAMS.join(','),
  });
  return res.data.map((brand) => ({
    locale: DEFAULT_LOCALE,
    brandSlug: brand.slug,
  }));
};

const BrandListingPage = async ({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) => {
  const { brandSlug } = await params;

  const { brand, products, totalPages, totalProducts } =
    await fetchBrandBySlug(brandSlug);

  const {
    name: brandName,
    description: brandDescription,
    id: brandId,
  } = brand || {};

  return (
    <>
      <Spacer size='sm' />
      <BreadcrumbsServer
        items={BRAND_LISTING_BREADCRUMBS(brandName as string)}
        size='large'
      />
      <ProductsServer
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageTitle={brandName}
        pageDescription={brandDescription}
        brandId={brandId}
      />
    </>
  );
};

export default BrandListingPage;

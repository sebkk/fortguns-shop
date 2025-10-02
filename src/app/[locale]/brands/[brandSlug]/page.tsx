import brandsAPI from '@/api/woocommerce/brands';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Spacer } from '@/components/Spacer';
import { BRANDS_FIELDS_FOR_METADATA } from '@/constants/brands';
import { BRAND_LISTING_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { Products } from '@/features/products/Products';
import { fetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';

export const revalidate = 600;
export const dynamic = 'force-static';

// import brandsAPI from '@/api/woocommerce/brands';
// import { BRANDS_FIELDS_FOR_STATIC_PARAMS } from '@/constants/brands';
// import { DEFAULT_LOCALE } from '@/constants/locales';
// export const generateStaticParams = async () => {
//   const res = await brandsAPI.getBrands({
//     fields: BRANDS_FIELDS_FOR_STATIC_PARAMS.join(','),
//   });
//   return res.data.map((brand) => ({
//     locale: DEFAULT_LOCALE,
//     brandSlug: brand.slug,
//   }));
// };

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
    type: 'website',
    locale: 'en_US',
    breadcrumbs: BRAND_LISTING_BREADCRUMBS(brandName as string),
  };
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
      <Breadcrumbs
        items={BRAND_LISTING_BREADCRUMBS(brandName as string)}
        size='large'
      />
      <Products
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

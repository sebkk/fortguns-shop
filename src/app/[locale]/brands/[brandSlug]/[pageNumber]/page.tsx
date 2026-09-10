import { notFound } from 'next/navigation';

import brandsAPI from '@/api/woocommerce/brands';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { BRANDS_FIELDS_FOR_METADATA } from '@/constants/brands';
import { BRAND_LISTING_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { Products } from '@/features/products/Products';
import { cachedFetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';
import { withCanonical } from '@/helpers/metadata/canonical';
import {
  getValidPaginationPage,
  isPaginationPageOutOfRange,
} from '@/helpers/pagination';

export const dynamic = 'force-static';
export const revalidate = 7200;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ brandSlug: string; pageNumber: string }>;
}) => {
  const { brandSlug, pageNumber } = await params;

  if (!getValidPaginationPage(pageNumber)) {
    notFound();
  }

  const response = await brandsAPI.getBrand(brandSlug, {
    fields: BRANDS_FIELDS_FOR_METADATA.join(','),
  });
  const { data } = response || {};

  const [brand] = data;

  const { name: brandName, description: brandDescription } = brand || {};

  return withCanonical(
    {
      title: `Fortguns - ${brandName}`,
      description: brandDescription,
      keywords: brandName,
    },
    NAVIGATION_ROUTE.BRAND_LISTING_PAGINATION,
    { brandSlug, pageNumber },
  );
};

const BrandListingPageNavigation = async ({
  params,
}: {
  params: Promise<{ brandSlug: string; pageNumber: string }>;
}) => {
  const { brandSlug, pageNumber } = await params;
  const page = getValidPaginationPage(pageNumber);

  if (!page) {
    notFound();
  }

  const { brand, products, totalPages, totalProducts } =
    await cachedFetchBrandBySlug(brandSlug, {
      productParams: {
        page,
      },
    });

  if (!brand || isPaginationPageOutOfRange(page, totalPages)) {
    notFound();
  }

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
        pageNumber={page}
        pageTitle={brandName}
        pageDescription={brandDescription}
        brandId={brandId}
      />
    </>
  );
};

export default BrandListingPageNavigation;

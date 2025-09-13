import parseHTML from 'html-react-parser';

import brandsAPI from '@/api/woocommerce/brands';
import { BRANDS_FIELDS_FOR_STATIC_PARAMS } from '@/constants/brands';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { Products } from '@/features/products/Products';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

export const revalidate = 600;
export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const res = await brandsAPI.getBrands({
    fields: BRANDS_FIELDS_FOR_STATIC_PARAMS.join(','),
  });
  return res.data.map((brand) => ({
    locale: DEFAULT_LOCALE,
    brandSlug: parseHTML(brand.slug),
  }));
};

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

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
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

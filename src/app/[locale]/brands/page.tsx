import { BrandsPageContent } from '@/features/brands/BrandsPageContent';
import { fetchBrands } from '@/handlers/brands/fetchBrands';

export const revalidate = 600;
export const dynamic = 'force-static';

const BrandsPage = async () => {
  const { brands, totalProducts } = await fetchBrands({
    params: { per_page: 50 },
  });

  return <BrandsPageContent brands={brands} totalProducts={totalProducts} />;
};

export default BrandsPage;

import { BrandsPageContent } from '@/features/brands/BrandsPageContent';
import { fetchBrands } from '@/handlers/brands/fetchBrands';

export const revalidate = 600;
export const dynamic = 'force-static';

const BrandsPage = async () => {
  const { brands, groupedBrands, totalProducts } = await fetchBrands({
    params: { per_page: 50 },
  });

  return (
    <>
      {/* <BreadcrumbsExample /> */}
      <BrandsPageContent
        brands={brands}
        groupedBrands={groupedBrands}
        totalProducts={totalProducts}
      />
    </>
  );
};

export default BrandsPage;

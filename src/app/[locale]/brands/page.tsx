import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { BRANDS_BREADCRUMBS } from '@/constants/breadcrumbs/brands';
import { BrandsPageContent } from '@/features/brands/BrandsPageContent';
import { fetchBrands } from '@/handlers/brands/fetchBrands';

export const revalidate = 600;
export const dynamic = 'force-static';

const BrandsPage = async () => {
  const { groupedBrands, totalBrands } = await fetchBrands({
    params: { per_page: 50 },
  });

  return (
    <>
      <Breadcrumbs items={BRANDS_BREADCRUMBS} size='large' />
      <BrandsPageContent
        groupedBrands={groupedBrands}
        totalBrands={totalBrands}
      />
    </>
  );
};

export default BrandsPage;

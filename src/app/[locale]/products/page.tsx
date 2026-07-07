import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContentSections } from '@/components/ContentSections';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { cachedGetPageContent } from '@/handlers/page/getPageContent';
import { cachedGetPageMetadata } from '@/handlers/page/getPageMetadata';
import { cachedFetchProducts } from '@/handlers/products/fetchProducts';
import { TMetadataType } from '@/types/metadata';
import { IProductListing } from '@/types/product';

export const revalidate = 7200;
export const dynamic = 'force-static';

export const generateMetadata = async () => {
  const { metadata } = await cachedGetPageMetadata(
    PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].slice(1),
    {},
    TMetadataType.DEFAULT_PAGE,
  );

  return metadata;
};

const ProductsPage = async () => {
  const { products, totalPages, totalProducts } =
    await cachedFetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page: 1,
      },
    });

  const { sections, pageTitle } = await cachedGetPageContent(
    PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].slice(1),
  );

  return (
    <>
      <Breadcrumbs items={PRODUCTS_BREADCRUMBS} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageTitle={pageTitle}
      />
      {sections && <ContentSections sections={sections} />}
    </>
  );
};

export default ProductsPage;

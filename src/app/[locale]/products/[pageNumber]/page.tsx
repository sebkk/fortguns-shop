import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ContentSections } from '@/components/ContentSections';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { getPageContent } from '@/handlers/page/getPageContent';
import { getPageMetadata } from '@/handlers/page/getPageMetadata';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { TMetadataType } from '@/types/metadata';
import { IProductListing } from '@/types/product';

interface IProductPagePaginationProps {
  params: Promise<{ pageNumber: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 600;
export const dynamicParams = true;

export const generateMetadata = async () => {
  const { metadata } = await getPageMetadata(
    PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].slice(1),
    {},
    TMetadataType.DEFAULT_PAGE,
  );

  return metadata;
};

const ProductPagePagination = async ({
  params,
}: IProductPagePaginationProps) => {
  const { pageNumber } = await params;

  if (isNaN(+pageNumber)) {
    notFound();
  }

  const { products, totalPages, totalProducts } =
    await fetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page: pageNumber ? +pageNumber : 1,
      },
    });

  const { sections, pageTitle } = await getPageContent(
    PATHNAMES[NAVIGATION_ROUTE.PRODUCTS_LISTING][DEFAULT_LOCALE].slice(1),
  );

  return (
    <>
      <Breadcrumbs items={PRODUCTS_BREADCRUMBS} size='large' />
      <Products
        products={products}
        totalPages={totalPages}
        totalProducts={totalProducts}
        pageNumber={+pageNumber}
        pageTitle={pageTitle}
      />
      {sections && <ContentSections sections={sections} />}
    </>
  );
};

export default ProductPagePagination;

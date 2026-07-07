import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ContentSections } from '@/components/ContentSections';
import { PRODUCTS_BREADCRUMBS } from '@/constants/breadcrumbs/products';
import { DEFAULT_LOCALE, PATHNAMES } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { Products } from '@/features/products/Products';
import { cachedGetPageContent } from '@/handlers/page/getPageContent';
import { cachedGetPageMetadata } from '@/handlers/page/getPageMetadata';
import { cachedFetchProducts } from '@/handlers/products/fetchProducts';
import {
  getValidPaginationPage,
  isPaginationPageOutOfRange,
} from '@/helpers/pagination';
import { TMetadataType } from '@/types/metadata';
import { IProductListing } from '@/types/product';

interface IProductPagePaginationProps {
  params: Promise<{ pageNumber: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 7200;
export const dynamicParams = true;

export const generateMetadata = async ({
  params,
}: IProductPagePaginationProps) => {
  const { pageNumber } = await params;

  if (!getValidPaginationPage(pageNumber)) {
    notFound();
  }

  const { metadata } = await cachedGetPageMetadata(
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
  const page = getValidPaginationPage(pageNumber);

  if (!page) {
    notFound();
  }

  const { products, totalPages, totalProducts } =
    await cachedFetchProducts<IProductListing>({
      params: {
        per_page: PER_PAGE_DEFAULT,
        page,
      },
    });

  if (isPaginationPageOutOfRange(page, totalPages)) {
    notFound();
  }

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
        pageNumber={page}
        pageTitle={pageTitle}
      />
      {sections && <ContentSections sections={sections} />}
    </>
  );
};

export default ProductPagePagination;

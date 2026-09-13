import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Spacer } from '@/components/Spacer';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { ProductDescriptionSection } from '@/features/product/ProductDescriptionSection';
import { ProductMainSection } from '@/features/product/ProductMainSection';
import { ProductRelatedItems } from '@/features/product/ProductRelatedItems';
import { fetchInStockSlugs } from '@/handlers/products/fetchInStockSlugs';
import { cachedFetchProductDetails } from '@/handlers/products/fetchProductDetails';
import { cachedGetProductMetadata } from '@/handlers/products/getProductMetadata';
import { createProductDetailsBreadcrumbs } from '@/helpers/breadcrumbs/createProductDetailsBreadcrumbs';
import { withCanonical } from '@/helpers/metadata/canonical';
import { IProductDetails } from '@/types/product';

export const dynamic = 'force-static';
export const revalidate = 7200;
export const dynamicParams = true;

/**
 * Bez tej listy każda karta powstawała dopiero przy pierwszym wejściu na nią.
 * Zmierzone na produkcji: pierwsze wejście 1,8–2,8 s do pierwszego bajtu,
 * kolejne 50 ms. Każde wdrożenie kasuje gotowy HTML, więc ten rachunek
 * płacił od nowa pierwszy odwiedzający każdego adresu — najczęściej robot
 * Google, który akurat wtedy mierzy szybkość odpowiedzi.
 */
export const generateStaticParams = async () => {
  const slugs = await fetchInStockSlugs();

  return slugs.map((productSlug) => ({
    locale: DEFAULT_LOCALE,
    productSlug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  try {
    const { productSlug } = await params;

    const { metadata } = await cachedGetProductMetadata(productSlug);

    return withCanonical(metadata, NAVIGATION_ROUTE.PRODUCT_DETAILS, {
      productSlug,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
    };
  }
}

interface IProductPageProps {
  params: Promise<{
    locale: string;
    productSlug: string;
  }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
  const { productSlug } = await params;
  const product = await cachedFetchProductDetails<IProductDetails>(productSlug);

  if (!product) {
    notFound();
  }

  const { categories, name } = product;

  const breadcrumbs = createProductDetailsBreadcrumbs(name, categories);

  const { metadata } = await cachedGetProductMetadata(productSlug);

  return (
    <>
      <JsonLd scripts={metadata.scripts} />
      <Breadcrumbs items={breadcrumbs} size='large' />
      <Spacer size='lg' />
      <div className='container'>
        <ProductMainSection product={product} />
        <ProductDescriptionSection product={product} />
        <ProductRelatedItems product={product} />
        <Spacer size='lg' />
      </div>
    </>
  );
};

export default ProductPage;

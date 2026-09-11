import { getTranslations } from 'next-intl/server';

import { ProductsCarousel } from '@/components/_carousels/ProductsCarousel';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { fetchRelatedProducts } from '@/handlers/products/fetchRelatedProducts';
import { IProductDetails } from '@/types/product';

interface IProductRelatedItemsProps {
  product: IProductDetails;
}

export const ProductRelatedItems = async ({
  product,
}: IProductRelatedItemsProps) => {
  const t = await getTranslations();

  const { id, categories, brands } = product;

  const relatedProducts = await fetchRelatedProducts({
    id,
    categories,
    brands,
  });

  if (!relatedProducts.length) return null;
  return (
    <div>
      <Spacer />
      <TitleWithDesc titleProps={{ tag: 'h3' }} title={t('similarProducts')} />
      <Spacer size='md' />
      <ProductsCarousel items={relatedProducts} />
    </div>
  );
};

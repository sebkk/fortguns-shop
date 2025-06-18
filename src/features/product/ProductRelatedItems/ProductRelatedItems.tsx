import { getTranslations } from 'next-intl/server';

import productsApi from '@/api/woocommerce/products';
import { ProductsCarousel } from '@/components/_carousels/ProductsCarousel';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { IProduct, StockStatus } from '@/types/product';

interface IProductRelatedItemsProps {
  relatedIds: IProduct['related_ids'];
}

export const ProductRelatedItems = async ({
  relatedIds,
}: IProductRelatedItemsProps) => {
  const t = await getTranslations();

  const response = await productsApi.getProducts({
    per_page: 12,
    include: relatedIds.join(','),
    stock_status: StockStatus.INSTOCK,
  });

  if (!response.data?.length) return null;
  return (
    <div>
      <Spacer />
      <TitleWithDesc titleProps={{ tag: 'h3' }} title={t('similarProducts')} />
      <Spacer size='md' />
      <ProductsCarousel items={response.data} />
    </div>
  );
};

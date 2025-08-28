import { getTranslations } from 'next-intl/server';

import productsApi from '@/api/woocommerce/products';
import { ProductsCarousel } from '@/components/_carousels/ProductsCarousel';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { IProduct, IProductListing, STOCK_STATUS } from '@/types/product';

interface IProductRelatedItemsProps {
  relatedIds: IProduct['related_ids'];
}

export const ProductRelatedItems = async ({
  relatedIds,
}: IProductRelatedItemsProps) => {
  const t = await getTranslations();

  const response = await productsApi.getProducts<IProductListing>({
    per_page: PER_PAGE_DEFAULT,
    include: relatedIds.join(','),
    stock_status: STOCK_STATUS.INSTOCK,
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

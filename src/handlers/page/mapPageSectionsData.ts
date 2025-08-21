import productsApi from '@/api/woocommerce/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { StockStatus } from '@/types/product';
import {
  ISectionProductsCarousel,
  TFlexibleContentLayout,
} from '@/types/sections';

const mapProductsCarousel = async (section: ISectionProductsCarousel) => {
  const productsRes = await productsApi.getProducts({
    per_page: PER_PAGE_DEFAULT,
    stock_status: StockStatus.INSTOCK,
    orderby: 'date',
    order: 'desc',
  });
  return {
    ...section,
    products: productsRes.data,
  };
};

export const mapPageSectionsData = async (sections: TFlexibleContentLayout[]) =>
  await Promise.all(
    sections.map(async (section) => {
      if (section.acf_fc_layout === 'section_products_carousel') {
        return await mapProductsCarousel(section);
      }

      return section;
    }),
  );

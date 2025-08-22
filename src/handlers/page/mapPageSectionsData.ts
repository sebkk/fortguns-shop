import productsApi from '@/api/woocommerce/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import {
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
  STOCK_STATUS,
} from '@/types/product';
import {
  ISectionProductsCarousel,
  TFlexibleContentLayout,
} from '@/types/sections';

const mapProductsCarousel = async (section: ISectionProductsCarousel) => {
  const productsRes = await productsApi.getProducts({
    per_page: PER_PAGE_DEFAULT,
    stock_status: STOCK_STATUS.INSTOCK,
    orderby: PRODUCTS_ORDER_BY.DATE,
    order: PRODUCTS_ORDER.DESC,
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

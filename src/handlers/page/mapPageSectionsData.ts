import globalInfosApi from '@/api/global_infos';
import productsApi from '@/api/woocommerce/products';
import { GLOBAL_INFOS_NEWSLETTER_ID } from '@/constants/globalInfos';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import {
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
  STOCK_STATUS,
} from '@/types/product';
import {
  ISectionNewsletter,
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

const mapNewsletter = async (section: ISectionNewsletter) => {
  const globalInfosData = await globalInfosApi.getGlobalInfosById(
    GLOBAL_INFOS_NEWSLETTER_ID,
  );

  const [newsletterData] = globalInfosData.acf.data;

  return { ...newsletterData, ...section };
};

export const mapPageSectionsData = async (sections: TFlexibleContentLayout[]) =>
  await Promise.all(
    sections.map(async (section) => {
      if (section.acf_fc_layout === 'section_products_carousel') {
        return await mapProductsCarousel(section);
      }

      if (section.acf_fc_layout === 'section_newsletter') {
        return await mapNewsletter(section);
      }

      return section;
    }),
  );

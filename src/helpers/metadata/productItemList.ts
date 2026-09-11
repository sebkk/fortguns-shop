import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { TMetadataTransformResult } from '@/types/metadata';

import { getCanonicalPath } from './canonical';
import { SITE_URL } from './cmsUrl';

interface IListedProduct {
  slug?: string;
}

interface IItemListOptions {
  page?: number;
  perPage?: number;
}

/**
 * Google czyta listingi wzorcem „strona zbiorcza plus strony szczegółowe":
 * element listy niesie wyłącznie pozycję i adres, a opis towaru zostaje na
 * karcie produktu. Dokładanie tu ceny czy zdjęcia nic nie wnosi, a powiela
 * dane, które i tak są piętro niżej.
 *
 * Pozycje liczone są przez całą paginację, więc drugi ekran zaczyna się od
 * trzynastki, a nie znowu od jedynki.
 */
export const buildProductItemList = (
  products: IListedProduct[] | undefined,
  { page = 1, perPage = PER_PAGE_DEFAULT }: IItemListOptions = {},
): TMetadataTransformResult['scripts'] => {
  const itemListElement = (products ?? [])
    .filter((product): product is { slug: string } => !!product?.slug)
    .map(({ slug }, index) => ({
      '@type': 'ListItem',
      position: (page - 1) * perPage + index + 1,
      url: `${SITE_URL}${getCanonicalPath(NAVIGATION_ROUTE.PRODUCT_DETAILS, {
        productSlug: slug,
      })}`,
    }));

  if (!itemListElement.length) return [];

  return [
    {
      type: 'application/ld+json',
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement,
      }),
    },
  ];
};

import productsApi from '@/api/woocommerce/products';
import { PRODUCTS_FIELDS_FOR_SITEMAP } from '@/constants/products';
import { IProductSitemap, STOCK_STATUS } from '@/types/product';

/**
 * Slugi wszystkich egzemplarzy, które są na stanie — do wygenerowania kart
 * już na etapie budowania.
 *
 * Sprzedane pomijamy świadomie. Jest ich ponad sześćset i rośnie, a wchodzi
 * na nie głównie ruch z Google, który i tak trafia na pojedyncze adresy.
 * Zbudowanie ich wszystkich wydłużyłoby każde wdrożenie o kilkanaście minut
 * i odpytało CMS tysiąc razy, a zysk dotyczyłby stron o najniższym
 * priorytecie w mapie strony. Powstają więc przy pierwszym wejściu i od tego
 * momentu są w pamięci podręcznej tak samo jak reszta.
 */
export const fetchInStockSlugs = async (): Promise<string[]> => {
  try {
    const firstPage = await productsApi.getProducts<IProductSitemap>({
      _fields: PRODUCTS_FIELDS_FOR_SITEMAP.join(','),
      per_page: 100,
      stock_status: STOCK_STATUS.INSTOCK,
    });

    const totalPages = Number(firstPage.headers['x-wp-totalpages'] ?? 0);

    const restPages: IProductSitemap[][] = [];

    // Strony po kolei, nie równolegle: budowanie i tak odpytuje CMS o każdą
    // kartę, a Hostinger nie jest miejscem, w które warto strzelać seriami.
    for (let page = 2; page <= totalPages; page += 1) {
      const response = await productsApi.getProducts<IProductSitemap>({
        _fields: PRODUCTS_FIELDS_FOR_SITEMAP.join(','),
        per_page: 100,
        stock_status: STOCK_STATUS.INSTOCK,
        page,
      });

      restPages.push(response.data);
    }

    return [...firstPage.data, ...restPages.flat()]
      .map(({ slug }) => slug)
      .filter(Boolean);
  } catch (error) {
    console.error(error);

    // Pusta lista znaczy tylko tyle, że karty powstaną przy pierwszym
    // wejściu — tak jak przed tą zmianą. Wdrożenie nie może się wywrócić
    // dlatego, że CMS akurat nie odpowiedział.
    return [];
  }
};

import { unstable_cache } from 'next/cache';

import categoriesApi from '@/api/woocommerce/categories';
import productsApi from '@/api/woocommerce/products';
import { PRODUCTS_DATA_REVALIDATE } from '@/constants/cache';
import { CATEGORIES_FIELDS_FOR_RELATED } from '@/constants/categories';
import { PRODUCTS_FIELDS } from '@/constants/products';
import {
  IGetProductsParams,
  IProductBrand,
  IProductCategory,
  IProductListing,
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
  STOCK_STATUS,
} from '@/types/product';

export const RELATED_PRODUCTS_LIMIT = 8;

/**
 * Marka dostaje połowę miejsc, nie wszystkie. Przy ośmiu Rugerach na stanie
 * karta rewolweru Rugera pokazywałaby same Rugery — w tym karabinki, bo marka
 * się zgadza, a typ broni już nie. Druga połowa idzie na tę samą wąską
 * kategorię, żeby obok "więcej tej marki" stało też "inny taki rewolwer".
 */
const BRAND_SLOTS = RELATED_PRODUCTS_LIMIT / 2;

/**
 * Pobieramy o jeden więcej, niż pokazujemy: w wyniku prawie zawsze siedzi
 * oglądany właśnie egzemplarz, którego zaraz odsiewamy. Dzięki temu, że nie
 * wycinamy go już w zapytaniu, to samo zapytanie obsługuje wszystkie produkty
 * danej marki i kategorii — i wpada do pamięci podręcznej raz, a nie raz na
 * każdą z ponad tysiąca kart.
 */
const FETCH_SIZE = RELATED_PRODUCTS_LIMIT + 1;

const fetchInStock = async (
  params: IGetProductsParams,
): Promise<IProductListing[]> => {
  try {
    const response = await productsApi.getProducts<IProductListing>({
      _fields: PRODUCTS_FIELDS.join(','),
      per_page: FETCH_SIZE,
      stock_status: STOCK_STATUS.INSTOCK,
      orderby: PRODUCTS_ORDER_BY.DATE,
      order: PRODUCTS_ORDER.DESC,
      ...params,
    });

    return response.data ?? [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const cachedProductsByBrand = unstable_cache(
  async (brandId: number) => fetchInStock({ brand: brandId }),
  ['related-products-by-brand'],
  { revalidate: PRODUCTS_DATA_REVALIDATE, tags: ['products'] },
);

const cachedProductsByCategory = unstable_cache(
  async (categoryId: number) => fetchInStock({ category: String(categoryId) }),
  ['related-products-by-category'],
  { revalidate: PRODUCTS_DATA_REVALIDATE, tags: ['products'] },
);

const cachedCategoryParents = unstable_cache(
  async (): Promise<Record<number, number>> => {
    try {
      const response = await categoriesApi.getCategories({
        _fields: CATEGORIES_FIELDS_FOR_RELATED.join(','),
        per_page: 100,
      });

      return Object.fromEntries(
        response.data.map(({ id, parent }) => [id, parent]),
      );
    } catch (error) {
      console.error(error);

      return {};
    }
  },
  ['product-category-parents'],
  { revalidate: PRODUCTS_DATA_REVALIDATE, tags: ['products'] },
);

/**
 * Egzemplarz należy jednocześnie do kategorii szerokiej ("Broń używana") i
 * wąskiej ("Pistolety używane"). Podobny to ten z wąskiej, więc bierzemy
 * kategorię, która ma rodzica. Rodzica czytamy z CMS-a, żeby dołożenie nowej
 * kategorii nie wymagało ruszania kodu.
 */
const pickNarrowestCategory = (
  categories: IProductCategory[],
  parents: Record<number, number>,
) => categories.find(({ id }) => (parents[id] ?? 0) !== 0) ?? categories[0];

/**
 * WooCommerce ma własne `related_ids`, ale wylicza je raz i zapamiętuje — na
 * karcie z 2025 roku wskazywały wyłącznie egzemplarze z pierwszych dostaw,
 * dawno sprzedane. Po odsianiu tego, czego nie ma na stanie, zostawało zero
 * produktów i sekcja "Podobne produkty" nie pokazywała się na żadnej karcie.
 * Dlatego dobieramy je sami: najpierw ta sama marka, potem ta sama wąska
 * kategoria — i zawsze tylko to, co faktycznie stoi w sklepie.
 */
export const fetchRelatedProducts = async ({
  id,
  categories,
  brands,
}: {
  id: number;
  categories?: IProductCategory[];
  brands?: IProductBrand[];
}): Promise<IProductListing[]> => {
  const parents = await cachedCategoryParents();

  const category = pickNarrowestCategory(categories ?? [], parents);
  const brand = brands?.[0];

  const [sameBrand, sameCategory] = await Promise.all([
    brand ? cachedProductsByBrand(brand.id) : [],
    category ? cachedProductsByCategory(category.id) : [],
  ]);

  const seen = new Set<number>([id]);

  const ordered = [
    ...sameBrand
      .filter(({ id: candidateId }) => candidateId !== id)
      .slice(0, BRAND_SLOTS),
    ...sameCategory,
    ...sameBrand,
  ];

  return ordered.reduce<IProductListing[]>((related, product) => {
    if (related.length === RELATED_PRODUCTS_LIMIT || seen.has(product.id)) {
      return related;
    }

    seen.add(product.id);

    return [...related, product];
  }, []);
};

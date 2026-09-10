import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import {
  DEFAULT_SORT,
  PER_PAGE_DEFAULT,
  SORT_OPTIONS,
} from '@/constants/products';
import { STOCK_STATUS } from '@/types/product';

interface UseProductsOptions<T> {
  initialProducts?: T[];
  perPage?: number;
  categoryId?: string;
  initialTotalPages?: number;
  initialTotalProducts?: number;
  brandId?: number;
}

interface UseProductsReturn<T> {
  products: T[] | undefined;
  isLoading: boolean;
  error: string | null;
  currentSort: string;
  handleSortChange: (value: string) => void;
  refreshProducts: () => Promise<void>;
  totalPages: number;
  totalProducts: number;
  page: number;
  currentPerPage: number;
  handlePerPageChange: (perPage: number) => void;
}

export const useProducts = <T>({
  initialProducts,
  perPage = PER_PAGE_DEFAULT,
  categoryId,
  initialTotalPages,
  initialTotalProducts,
  brandId,
}: UseProductsOptions<T>): UseProductsReturn<T> => {
  const searchParams = useSearchParams();
  const t = useTranslations();

  const [products, setProducts] = useState<T[] | undefined>(initialProducts);
  // Serwer podaje pierwszą stronę listingu gotową, więc zaczynanie od stanu
  // ładowania kazało renderować szkielety mimo trzymania danych w ręku:
  // crawler dostawał pustą siatkę, a każdy adres z nieznanym parametrem
  // (fbclid, gclid, utm_*) zostawał na szkieletach na stałe — żaden z efektów
  // niżej nie gasił tego stanu. Ładowanie zaczyna się dopiero wtedy, gdy
  // naprawdę nie ma czego pokazać, a fetchProducts i tak ustawia je sam.
  const [isLoading, setIsLoading] = useState<boolean>(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages || 0);
  const [totalProducts, setTotalProducts] = useState<number>(
    initialTotalProducts || 0,
  );

  // Adres może nieść sortowanie, którego już nie ma — choćby stare ?sort=default
  // z zakładki albo z indeksu wyszukiwarki. Nieznaną wartość traktujemy jak brak,
  // bo inaczej rozpada się na śmieci i zapytanie do WooCommerce leci z błędem.
  const sortParam = searchParams.get('sort');
  const currentSort = SORT_OPTIONS.some(({ value }) => value === sortParam)
    ? (sortParam as string)
    : DEFAULT_SORT;
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const currentPerPage = Number(searchParams.get('per_page')) || perPage;
  const currentSearch = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query string for API route
      const queryParams = new URLSearchParams();
      queryParams.set('per_page', currentPerPage.toString());
      queryParams.set('page', currentPage.toString());

      if (categoryId) {
        queryParams.set('category', categoryId);
      }

      const [orderby, order] = currentSort.split('-');
      queryParams.set('orderby', orderby);
      queryParams.set('order', order);

      if (brandId) {
        queryParams.set('brand', brandId.toString());
        // stock_status will be handled by API route when brand is present
      } else {
        queryParams.set('stock_status', STOCK_STATUS.INSTOCK);
      }

      if (currentSearch) {
        queryParams.set('search', currentSearch);
      }

      // Fetch from Next.js API route
      const response = await fetch(
        `/api/search/products?${queryParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const productsData: T[] = await response.json();
      const totalPagesValue = parseInt(
        response.headers.get('X-WP-TotalPages') || '0',
        10,
      );
      const totalProductsValue = parseInt(
        response.headers.get('X-WP-Total') || '0',
        10,
      );

      setProducts(productsData);
      setTotalPages(totalPagesValue);
      setTotalProducts(totalProductsValue);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(t('errorLoadingProducts'));
    } finally {
      setIsLoading(false);
    }
  }, [
    currentSort,
    currentPerPage,
    categoryId,
    currentPage,
    brandId,
    currentSearch,
  ]);

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', value);

      // Domyślne sortowanie nie musi siedzieć w adresie — /produkty zostaje czyste.
      if (value === DEFAULT_SORT) {
        params.delete('sort');
      }
      return params.toString();
    },
    [searchParams],
  );

  const handlePerPageChange = useCallback(
    (perPage: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('per_page', perPage.toString());

      if (perPage === PER_PAGE_DEFAULT) {
        params.delete('per_page');
      }

      return params.toString();
    },
    [searchParams],
  );

  const refreshProducts = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    if (
      currentSort !== DEFAULT_SORT ||
      currentPage !== 1 ||
      currentPerPage !== perPage ||
      currentSearch
    ) {
      fetchProducts();
    }
  }, [currentSort, currentPage, currentPerPage, currentSearch]);

  useEffect(() => {
    if (searchParams.toString() === '') {
      setIsLoading(false);
      setProducts(initialProducts);
      setTotalPages(initialTotalPages || 0);
      setTotalProducts(initialTotalProducts || 0);
    }
  }, [searchParams]);

  return {
    products,
    isLoading,
    error,
    currentSort,
    currentPerPage,
    handleSortChange,
    handlePerPageChange,
    refreshProducts,
    totalPages,
    totalProducts,
    page: currentPage,
  };
};

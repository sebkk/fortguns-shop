import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import productsApi from '@/api/woocommerce/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import { IProduct, StockStatus } from '@/types/product';

interface UseProductsOptions {
  initialProducts?: IProduct[];
  perPage?: number;
  categoryId?: string;
  initialTotalPages?: number;
  initialTotalProducts?: number;
}

interface UseProductsReturn {
  products: IProduct[] | undefined;
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

export const useProducts = ({
  initialProducts,
  perPage = PER_PAGE_DEFAULT,
  categoryId,
  initialTotalPages,
  initialTotalProducts,
}: UseProductsOptions): UseProductsReturn => {
  const searchParams = useSearchParams();
  const t = useTranslations();

  const [products, setProducts] = useState<IProduct[] | undefined>(
    initialProducts,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages || 0);
  const [totalProducts, setTotalProducts] = useState<number>(
    initialTotalProducts || 0,
  );

  const currentSort = searchParams.get('sort') || 'default';
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const currentPerPage = Number(searchParams.get('per_page')) || perPage;

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {
        per_page: currentPerPage,
        stock_status: StockStatus.INSTOCK,
        page: currentPage,
      };

      if (categoryId) {
        params.category = categoryId;
      }
      if (currentSort !== 'default') {
        const [orderby, order] = currentSort.split('-');
        params.orderby = orderby;
        params.order = order;
      }

      if (currentSort === 'default') {
        delete params.orderby;
        delete params.order;
      }

      const response = await productsApi.getProducts(params);

      setProducts(response.data);
      setTotalPages(Number(response.headers['x-wp-totalpages']));
      setTotalProducts(Number(response.headers['x-wp-total']));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(t('errorLoadingProducts'));
    } finally {
      setIsLoading(false);
    }
  }, [currentSort, currentPerPage, categoryId, currentPage]);

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', value);

      if (value === 'default') {
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
      currentSort !== 'default' ||
      currentPage !== 1 ||
      currentPerPage !== perPage
    ) {
      fetchProducts();
    }
  }, [currentSort, currentPage, currentPerPage]);

  useEffect(() => {
    if (searchParams.toString() === '') {
      setIsLoading(false);
    }
  }, []);

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

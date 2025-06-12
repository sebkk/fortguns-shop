'use client';

import { useCallback, useEffect, useState } from 'react';

import productsApi from '@/api/woocommerce/products';
import { Select } from '@/components/_form/Select';
import { ProductCard } from '@/components/ProductCard';
import { Spacer } from '@/components/Spacer';
import { IProduct } from '@/types/product';

import { Pagination } from '@/components/Pagination';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss'; // Import the SCSS module

type SortOption = {
  value: string;
  label: string;
  orderby?:
    | 'date'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating';
  order?: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { value: 'default', label: 'Domyślnie' },
  {
    value: 'price-asc',
    label: 'Cena: Rosnąco',
    orderby: 'price',
    order: 'asc',
  },
  {
    value: 'price-desc',
    label: 'Cena: Malejąco',
    orderby: 'price',
    order: 'desc',
  },
  { value: 'name-asc', label: 'Nazwa: A-Z', orderby: 'title', order: 'asc' },
  { value: 'name-desc', label: 'Nazwa: Z-A', orderby: 'title', order: 'desc' },
  { value: 'date-desc', label: 'Najnowsze', orderby: 'date', order: 'desc' },
  {
    value: 'popularity',
    label: 'Popularność',
    orderby: 'popularity',
    order: 'desc',
  },
];

interface IProductsProps {
  pageNumber?: number;
}

export const Products = ({ pageNumber = 1 }: IProductsProps) => {
  const t = useTranslations();
  const { push } = useRouter();

  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<string>('default');

  const fetchProducts = useCallback(async (sortValue: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const selectedSortOption = sortOptions.find(
        (opt) => opt.value === sortValue,
      );
      const params =
        selectedSortOption && selectedSortOption.value !== 'default'
          ? {
              orderby: selectedSortOption.orderby,
              order: selectedSortOption.order,
              stock_status: 'instock' as const,
            }
          : {};

      const res = await productsApi.getProducts({ per_page: 12, ...params });
      setProductsData(res.data as IProduct[]);
      setTotalPages(
        parseInt(res.headers['x-wp-totalpages'] || '0', 10) || res.data.length,
      );
      setTotalProducts(parseInt(res.headers['x-wp-total'] || '0', 10));
    } catch (err) {
      console.error(err);
      setError('Nie udało się załadować produktów.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentSort);
  }, [currentSort, fetchProducts]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSort(event.target.value);
  };

  if (isLoading && !productsData) {
    return (
      <div className={styles['loading-or-error-container']}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div
        className={`${styles['loading-or-error-container']} ${styles['error-text']}`}
      >
        {error}
      </div>
    );
  }

  const productsCount = Array.isArray(productsData) ? productsData.length : 0;

  const onPageChange = (page: number) => {
    push({
      //@ts-ignore
      pathname: NAVIGATION_ROUTE.PRODUCTS_LISTING_PAGINATION,
      params: { pageNumber: page },
    });
  };

  return (
    <div className={styles['products-container']}>
      <Spacer />
      <TitleWithDesc
        wrapperClassName={styles['products-title-desc-wrapper']}
        title='Tytuł strony'
        description='opis strony'
      />
      <Spacer />
      <div className={styles['header-bar']}>
        <div className={styles['header-bar-inner']}>
          <p className={styles['products-count']}>
            {t('productsCount', {
              productsCount: productsCount,
              allProductsCount: totalProducts,
            })}
          </p>
          <div className={styles['controls-container']}>
            <Select
              label='Sortowanie'
              selectProps={{ value: currentSort, onChange: handleSortChange }}
              id='products-sort'
              options={sortOptions}
              wrapperClassName={styles['sort-select-wrapper']}
            />
          </div>
        </div>
      </div>
      <div className={styles['main-content-container']}>
        <Spacer size='md' />
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={() => {}}
          wrapperClassName={styles['products-pagination-wrapper']}
        />
        <Spacer size='md' />
        {isLoading && (
          <div className={styles['refreshing-text']}>Odświeżanie...</div>
        )}
        {!isLoading && productsData && productsData.length > 0 ? (
          <ul className={styles['products-grid']}>
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          !isLoading && (
            <p className={styles['no-products-text']}>
              Brak produktów do wyświetlenia.
            </p>
          )
        )}
        <Spacer />
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={onPageChange}
          wrapperClassName={styles['products-pagination-wrapper']}
        />
      </div>
      <Spacer />
    </div>
  );
};

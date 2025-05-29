'use client';

import { useCallback, useEffect, useState } from 'react';

import productsApi from '@/api/woocommerce/products';
import { Select } from '@/components/_form/Select';
import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import { ProductCard } from '@/components/ProductCard';
import { Spacer } from '@/components/Spacer';
import { IProduct } from '@/types/product';

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

const ProductsPage = () => {
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<string>('default');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
            }
          : {};

      const res = await productsApi.getProducts(params);
      setProductsData(res.data as IProduct[]);
      setTotalPages(
        parseInt(res.headers['x-wp-totalpages'] || '0', 10) || res.data.length,
      );
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

  return (
    <>
      <Spacer />
      <div className={styles['header-bar']}>
        <div className={styles['header-bar-inner']}>
          <p
            className={styles['products-count']}
          >{`${totalPages || productsCount} produktów`}</p>
          <div className={styles['controls-container']}>
            <Select
              label='Sortowanie'
              selectProps={{ value: currentSort, onChange: handleSortChange }}
              id='products-sort'
              options={sortOptions}
              wrapperClassName={styles['sort-select-wrapper']}
            />
            <Button
              onClick={() => setIsDrawerOpen(true)}
              variant='outlined'
              color='primary'
              className={styles['filter-button']}
            >
              Filtry
            </Button>
          </div>
        </div>
      </div>
      <div className={styles['main-content-container']}>
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
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='Filtruj Produkty'
      >
        <p className={styles['drawer-content-text']}>
          Miejsce na filtry (np. kategorie, zakres cenowy).
        </p>
        <Button
          onClick={() => setIsDrawerOpen(false)}
          className={styles['drawer-apply-button']}
        >
          Zastosuj filtry (placeholder)
        </Button>
      </Drawer>
    </>
  );
};

export default ProductsPage;

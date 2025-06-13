'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { useRouter } from '@/i18n/navigation';
import { ICategory } from '@/types/categories';
import { IProduct } from '@/types/product';

import { ProductsHeader } from './ProductsHeader';
import styles from './styles.module.scss'; // Import the SCSS module

export type SortOption = {
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
  totalPages?: number;
  totalProducts?: number;
  products?: IProduct[];
  pageTitle?: string;
  pageDescription?: string;
  category?: ICategory;
}

export const Products = ({
  pageNumber = 1,
  totalPages = 0,
  totalProducts = 0,
  products,
  pageTitle,
  pageDescription,
  category,
}: IProductsProps) => {
  // const t = useTranslations();
  const { push } = useRouter();

  const pathname = usePathname();

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<string>('default');

  const isLoading = false;
  const error = null;

  // const fetchProducts = useCallback(async (sortValue: string) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const selectedSortOption = sortOptions.find(
  //       (opt) => opt.value === sortValue,
  //     );
  //     const params =
  //       selectedSortOption && selectedSortOption.value !== 'default'
  //         ? {
  //             orderby: selectedSortOption.orderby,
  //             order: selectedSortOption.order,
  //             stock_status: StockStatus.INSTOCK,
  //           }
  //         : {};

  //     const res = await productsApi.getProducts({ per_page: 12, ...params });
  //   } catch (err) {
  //     console.error(err);
  //     setError('Nie udało się załadować produktów.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSort(event.target.value);
  };

  if (isLoading && !products) {
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

  const onPageChange = (page: number) => {
    let path = pathname;

    if (path.includes(`/${pageNumber}`)) {
      path = path.replace(`/${pageNumber}`, `/${page}`);
    } else {
      path = path + `/${page}`;
    }

    push(path);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles['products-container']}>
      <Spacer />
      <TitleWithDesc
        wrapperClassName={styles['products-title-desc-wrapper']}
        title={pageTitle || category?.name}
        description={pageDescription || category?.description}
      />
      <Spacer />
      <ProductsHeader
        pageNumber={pageNumber}
        totalProducts={totalProducts}
        currentSort={currentSort}
        handleSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
      <div className={styles['main-content-container']}>
        <Spacer size='md' />
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={onPageChange}
          wrapperClassName={styles['products-pagination-wrapper']}
        />
        <Spacer size='md' />
        {isLoading && (
          <div className={styles['refreshing-text']}>Odświeżanie...</div>
        )}
        {!isLoading && products && products.length > 0 ? (
          <ul className={styles['products-grid']}>
            {products.map((product) => (
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

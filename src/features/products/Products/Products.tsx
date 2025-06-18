'use client';

import { ChangeEvent } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCard/ProductCardSkeleton';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { useAppRouter } from '@/hooks/useAppRouter';
import { useProducts } from '@/hooks/useProducts';
import { ICategory } from '@/types/categories';
import { SortOption } from '@/types/filters';
import { IProduct } from '@/types/product';

import { ProductsHeader } from './ProductsHeader';
import styles from './styles.module.scss'; // Import the SCSS module

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
  totalPages: initialTotalPages = 0,
  totalProducts: initialTotalProducts = 0,
  products: initialProducts,
  pageTitle,
  pageDescription,
  category,
}: IProductsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const { push } = useAppRouter();

  const {
    products,
    isLoading,
    error,
    currentSort,
    handleSortChange,
    totalPages,
    totalProducts,
    page,
  } = useProducts({
    initialProducts,
    categoryId: category?.id.toString(),
    initialTotalPages,
    initialTotalProducts,
  });

  const currentPage = searchParams.get('page') ? page : pageNumber;

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const queryString = handleSortChange(e.target.value);

    let newPathname = pathname;
    if (pathname.includes(`/${currentPage}`)) {
      newPathname = pathname.replace(`/${currentPage}`, '');
    }

    push(`${newPathname}?${queryString}`);
  };

  if (isLoading && !products) {
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
          totalProducts={initialTotalProducts}
          currentSort={currentSort}
          handleSortChange={onSortChange}
          sortOptions={sortOptions}
        />
        <div className={styles['main-content-container']}>
          <Spacer size='md' />
          <ul className={styles['products-grid']}>
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.toString()) {
      params.set('page', page.toString());
      push(`${pathname}?${params.toString()}`);
    } else {
      let path = pathname;
      if (path.includes(`/${currentPage}`)) {
        path = path.replace(`/${currentPage}`, `/${page}`);
      } else {
        path = path + `/${page}`;
      }
      push(path);
    }

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
        pageNumber={currentPage}
        totalProducts={totalProducts}
        currentSort={currentSort}
        handleSortChange={onSortChange}
        sortOptions={sortOptions}
      />
      <div className={styles['main-content-container']}>
        <Spacer size='md' />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          wrapperClassName={styles['products-pagination-wrapper']}
        />
        <Spacer size='md' />
        {isLoading && !error && (
          <ul className={styles['products-grid']}>
            {Array.from({ length: 12 }).map((_, index) => (
              <li key={index}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        )}
        {!error && (
          <>
            {!isLoading && products && products.length > 0 ? (
              <ul className={styles['products-grid']}>
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles['no-products-text']}>
                {t('noProductsToDisplay')}
              </p>
            )}
          </>
        )}
        {error && (
          <p className={styles['error-text']}>{t('errorLoadingProducts')}</p>
        )}
        <Spacer />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          wrapperClassName={styles['products-pagination-wrapper']}
        />
      </div>
      <Spacer />
    </div>
  );
};

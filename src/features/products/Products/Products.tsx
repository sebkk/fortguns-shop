'use client';

import { ChangeEvent } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCard/ProductCardSkeleton';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { SORT_OPTIONS } from '@/constants/products';
import { useAppRouter } from '@/hooks/useAppRouter';
import { useProducts } from '@/hooks/useProducts';
import { ICategory } from '@/types/categories';
import { IProduct } from '@/types/product';

import { PaginationWithCount } from './PaginationWithCount';
import styles from './Products.module.scss'; // Import the SCSS module
import { ProductsHeader } from './ProductsHeader';

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
    currentPerPage,
    handlePerPageChange,
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

  const onPerPageChange = (perPage: number) => {
    const queryString = handlePerPageChange(perPage);

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
          sortOptions={SORT_OPTIONS}
          currentPerPage={currentPerPage}
        />
        <div className={styles['main-content-container']}>
          <Spacer size='md' />
          <ul className={styles['products-grid']}>
            {Array.from({ length: currentPerPage }).map((_, index) => (
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
        sortOptions={SORT_OPTIONS}
        currentPerPage={currentPerPage}
      />
      <div className={styles['main-content-container']}>
        <Spacer size='md' />
        <PaginationWithCount
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          selectId='products-per-page-top'
          onPerPageChange={onPerPageChange}
          currentPerPage={currentPerPage}
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
            {!isLoading && products && products.length > 0 && (
              <ul className={styles['products-grid']}>
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && !products && (
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
        <PaginationWithCount
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          selectId='products-per-page-bottom'
          onPerPageChange={onPerPageChange}
          currentPerPage={currentPerPage}
        />
      </div>
      <Spacer />
    </div>
  );
};

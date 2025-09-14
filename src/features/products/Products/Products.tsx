'use client';

import { ChangeEvent } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCard/ProductCardSkeleton';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import { SORT_OPTIONS } from '@/constants/products';
import { useAppRouter } from '@/hooks/useAppRouter';
import { useProducts } from '@/hooks/useProducts';
import { ICategory } from '@/types/categories';
import { IProductListing } from '@/types/product';

import { PaginationWithCount } from './PaginationWithCount';
import styles from './Products.module.scss'; // Import the SCSS module
import { ProductsHeader } from './ProductsHeader';

interface IProductsProps {
  pageNumber?: number;
  totalPages?: number;
  totalProducts?: number;
  products?: IProductListing[];
  pageTitle?: string;
  pageDescription?: string;
  category?: ICategory;
  brandId?: number;
}

export const Products = ({
  pageNumber = 1,
  totalPages: initialTotalPages = 0,
  totalProducts: initialTotalProducts = 0,
  products: initialProducts,
  pageTitle,
  pageDescription,
  category,
  brandId,
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
  } = useProducts<IProductListing>({
    initialProducts,
    categoryId: category?.id.toString(),
    initialTotalPages,
    initialTotalProducts,
    brandId,
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

  const title = pageTitle || category?.name || t('productsListingTitle');
  const description = pageDescription || category?.description;
  const titleWithDesc = (title || description) && (
    <>
      <Spacer size='sm' />
      <TitleWithDesc
        wrapperClassName={styles['products-title-desc-wrapper']}
        title={pageTitle || category?.name || t('productsListingTitle')}
        description={pageDescription || category?.description}
      />
    </>
  );

  if (isLoading && !products) {
    return (
      <div className={styles['products-container']}>
        {titleWithDesc}
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

      if (page === 1) {
        path = path.replace(`/${page}`, '');
      }

      push(path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const noProducts = !isLoading && (!products || !products.length);

  return (
    <div className={styles['products-container']}>
      {titleWithDesc}
      <Spacer />
      <ProductsHeader
        pageNumber={currentPage}
        totalProducts={totalProducts}
        currentSort={currentSort}
        handleSortChange={onSortChange}
        sortOptions={SORT_OPTIONS}
        currentPerPage={currentPerPage}
        noProducts={noProducts}
      />
      <div className={styles['main-content-container']}>
        <Spacer size='md' />
        {!noProducts && (
          <PaginationWithCount
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            selectId='products-per-page-top'
            onPerPageChange={onPerPageChange}
            currentPerPage={currentPerPage}
          />
        )}
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
                {products.map((product, index) => (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      imageProps={{ loading: index > 8 ? 'lazy' : 'eager' }}
                    />
                  </li>
                ))}
              </ul>
            )}
            {noProducts && (
              <Typography
                variant='c-heading'
                className={styles['no-products-text']}
              >
                {t('noProductsToDisplay')}
              </Typography>
            )}
          </>
        )}
        {error && (
          <p className={styles['error-text']}>{t('errorLoadingProducts')}</p>
        )}
        <Spacer />
        {!noProducts && (
          <PaginationWithCount
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            selectId='products-per-page-bottom'
            onPerPageChange={onPerPageChange}
            currentPerPage={currentPerPage}
          />
        )}
      </div>
      <Spacer />
    </div>
  );
};

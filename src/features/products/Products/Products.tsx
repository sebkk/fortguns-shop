'use client';

import { ChangeEvent } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCard/ProductCardSkeleton';
import { Spacer } from '@/components/Spacer';
import { TitleWithDesc } from '@/components/TitleWithDesc';
import { Typography } from '@/components/Typography';
import { SORT_OPTIONS } from '@/constants/products';
import { useAppRouter } from '@/hooks/useAppRouter';
import { usePathname } from '@/i18n/navigation';
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
  // Ścieżka wewnętrzna, nie publiczna: zarówno router next-intl, jak i jego
  // Link oczekują nazw tras sprzed tłumaczenia i same zamieniają je na polskie
  // adresy. Podanie im gotowego adresu publicznego dawało href-y w rodzaju
  // /pl/products/8, które działały tylko dzięki przekierowaniu.
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
        // Nazwa listingu jest tematem strony, a listingi nie miały <h1> wcale.
        // Wygląd bierze się z wariantu, nie ze znacznika, więc zmienia się tu
        // wyłącznie semantyka.
        titleProps={{ tag: 'h1' }}
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

  // Adres kolejnej strony listingu. Wyliczany osobno, bo trafia nie tylko do
  // nawigacji po kliknięciu, ale i do atrybutu href — bez niego numery stron
  // są gołymi przyciskami, po których crawler nie przejdzie dalej niż strona
  // pierwsza.
  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.toString()) {
      params.set('page', page.toString());

      return `${pathname}?${params.toString()}`;
    }

    let path = pathname;

    if (path.includes(`/${currentPage}`)) {
      path = path.replace(`/${currentPage}`, `/${page}`);
    } else {
      path = path + `/${page}`;
    }

    if (page === 1) {
      path = path.replace(`/${page}`, '');
    }

    return path;
  };

  const onPageChange = (page: number) => {
    push(getPageHref(page));

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
            getPageHref={getPageHref}
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
            getPageHref={getPageHref}
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

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/components/_icons/SearchIcon';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { BRANDS_FIELDS_FOR_SEARCH } from '@/constants/brands';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { PRODUCTS_FIELDS_FOR_SEARCH } from '@/constants/products';
import { fetchBrands } from '@/handlers/brands/fetchBrands';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { useRouter as useNextIntlRouter } from '@/i18n/navigation';
import { IBrand } from '@/types/brands';
import { IProductSearch } from '@/types/product';

import { SearchDropdown } from './SearchDropdown';
import styles from './styles.module.scss';

const DEBOUNCE_TIME_MS = 500;

interface SearchProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export interface ISearchResult<T> {
  items: T[] | null;
  totalPages: number;
  totalProducts: number;
}

export const Search = ({
  placeholder,
  className,
  initialValue = '',
}: SearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialValue);

  const router = useNextIntlRouter();

  const [loading, setLoading] = useState({
    marks: false,
    products: false,
  });

  const isLoading = loading.products || loading.marks;

  const [products, setProducts] = useState<ISearchResult<IProductSearch>>({
    items: null,
    totalPages: 0,
    totalProducts: 0,
  });
  const [brands, setBrands] = useState<ISearchResult<IBrand>>({
    items: null,
    totalPages: 0,
    totalProducts: 0,
  });

  const isFetched = !!(
    products.items &&
    brands.items &&
    !loading.products &&
    !loading.marks
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();

  const searchProducts = useCallback(async (query: string) => {
    setLoading((prev) => ({ ...prev, products: true }));
    try {
      const result = await fetchProducts<IProductSearch>({
        params: {
          search: query,
          per_page: 3,
          _fields: PRODUCTS_FIELDS_FOR_SEARCH.join(','),
        },
      });

      setProducts({
        ...result,
        items: result.products,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  }, []);

  const searchMarks = useCallback(async (query: string) => {
    setLoading((prev) => ({ ...prev, marks: true }));
    try {
      const result = await fetchBrands({
        params: {
          search: query,
          per_page: 3,
          fields: BRANDS_FIELDS_FOR_SEARCH.join(','),
        },
      });

      setBrands({
        ...result,
        items: result.brands,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, marks: false }));
    }
  }, []);

  const handleInternalSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        await Promise.all([searchProducts(query), searchMarks(query)]);

        setOpenDropdown(true);
      }, DEBOUNCE_TIME_MS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleExpand = () => {
    setIsExpanded(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      handleInternalSearch(query.trim());
    }
  };

  const handleNavigateToSearchPage = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: NAVIGATION_ROUTE.PRODUCTS_LISTING,
        query: {
          search: searchQuery,
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNavigateToSearchPage();
    } else if (e.key === 'Escape') {
      handleCollapse();
    }
  };

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isExpanded) {
      handleExpand();
    } else {
      handleNavigateToSearchPage();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      handleCollapse();
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      handleCloseDropdown();
    }
  }, [isExpanded]);

  const isVisibleDropdown =
    openDropdown && isExpanded && searchQuery.trim().length > 0 && isFetched;

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles['search'],
        isExpanded && styles['search--expanded'],
        isLoading && styles['search--loading'],
        className,
      )}
      onBlur={handleBlur}
    >
      <div className={clsx(styles['search-input-wrapper'])}>
        <input
          id='search'
          ref={inputRef}
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder || t('search')}
          className={styles['search-input']}
          onKeyDown={handleKeyDown}
          style={{
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
            width: isExpanded ? '100%' : '0px',
          }}
          disabled={isLoading}
        />
      </div>
      <Button
        onClick={handleSearchButtonClick}
        className={styles['search-button']}
        variant='blank'
        disabled={isLoading}
        aria-label={isExpanded ? t('search') : t('expandSearch')}
      >
        {isLoading ? <Spinner /> : <SearchIcon />}
      </Button>
      <SearchDropdown
        isVisible={isVisibleDropdown}
        isLoading={isLoading}
        products={products}
        brands={brands}
        searchQuery={searchQuery}
        handleCloseDropdown={handleCloseDropdown}
        parentRef={wrapperRef}
      />
    </div>
  );
};

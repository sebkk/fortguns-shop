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
import { fetchSearchBrandsFromAPI } from '@/handlers/brands/fetchSearchBrandsFromAPI';
import { fetchProductsFromAPI } from '@/handlers/products/fetchProductsFromAPI';
import { useAppRouter } from '@/hooks/useAppRouter';
import { IBrand } from '@/types/brands';
import { IProductSearch } from '@/types/product';

import { SearchDropdown } from './SearchDropdown';
import styles from './styles.module.scss';

const DEBOUNCE_TIME_MS = 500;

// A single letter matches most of the catalogue and is never a real query, so
// searching only starts once there is something to go on.
const MIN_QUERY_LENGTH = 2;

export const SEARCH_LISTBOX_ID = 'search-results-listbox';

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

  const router = useAppRouter();

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

  // The input stays usable while a search is in flight, so a slow response can
  // land after a newer one. Only the most recent request may write to state.
  const latestRequestRef = useRef(0);

  // -1 means "nothing highlighted": Enter then submits the query instead of
  // opening a result.
  const [activeIndex, setActiveIndex] = useState(-1);

  const t = useTranslations();

  const searchProducts = useCallback(
    async (query: string, requestId: number) => {
      setLoading((prev) => ({ ...prev, products: true }));
      try {
        const result = await fetchProductsFromAPI<IProductSearch>({
          params: {
            search: query,
            per_page: 3,
            _fields: PRODUCTS_FIELDS_FOR_SEARCH.join(','),
          },
        });

        if (requestId !== latestRequestRef.current) return;

        setProducts({
          ...result,
          items: result.products,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    },
    [],
  );

  const searchMarks = useCallback(async (query: string, requestId: number) => {
    setLoading((prev) => ({ ...prev, marks: true }));
    try {
      const result = await fetchSearchBrandsFromAPI({
        params: {
          search: query,
          per_page: 3,
          fields: BRANDS_FIELDS_FOR_SEARCH.join(','),
        },
      });

      if (requestId !== latestRequestRef.current) return;

      setBrands({
        ...result,
        items: result.brands,
        totalProducts: result.totalBrands,
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
        const requestId = ++latestRequestRef.current;

        await Promise.all([
          searchProducts(query, requestId),
          searchMarks(query, requestId),
        ]);

        if (requestId !== latestRequestRef.current) return;

        setIsExpanded(true);
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
    setActiveIndex(-1);

    if (query.trim().length >= MIN_QUERY_LENGTH) {
      handleInternalSearch(query.trim());
    } else {
      handleInternalSearch.cancel();
      setOpenDropdown(false);
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

  const optionsCount =
    (products.items?.length || 0) + (brands.items?.length || 0);

  const openActiveOption = () => {
    const option = document.getElementById(`search-option-${activeIndex}`);
    const anchor =
      option instanceof HTMLAnchorElement ? option : option?.querySelector('a');

    anchor?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!isVisibleDropdown || optionsCount === 0) return;

      e.preventDefault();

      setActiveIndex((prev) => {
        if (e.key === 'ArrowDown') {
          return prev + 1 >= optionsCount ? 0 : prev + 1;
        }

        return prev - 1 < 0 ? optionsCount - 1 : prev - 1;
      });
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault();
        openActiveOption();
        handleCloseDropdown();

        return;
      }

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
          role='combobox'
          aria-expanded={isVisibleDropdown}
          aria-controls={SEARCH_LISTBOX_ID}
          aria-autocomplete='list'
          aria-activedescendant={
            activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
          }
          autoComplete='off'
          style={{
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
            width: isExpanded ? '100%' : '0px',
          }}
        />
      </div>
      <Button
        onClick={handleSearchButtonClick}
        className={styles['search-button']}
        variant='blank'
        buttonProps={{
          'aria-label': isExpanded ? t('search') : t('expandSearch'),
        }}
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
        activeIndex={activeIndex}
      />
    </div>
  );
};

'use client';

import { useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/components/_icons/SearchIcon';
import { Button } from '@/components/Button';
import { fetchBrands } from '@/handlers/brands/fetchBrands';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IBrand } from '@/types/brands';
import { IProduct } from '@/types/product';

import styles from './styles.module.scss';

const DEBOUNCE_TIME_MS = 500;

interface SearchProps {
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export const Search = ({
  placeholder,
  className,
  initialValue = '',
}: SearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const [loading, setLoading] = useState({
    marks: false,
    products: false,
  });
  const [_products, setProducts] = useState<IProduct[]>([]);
  const [_brands, setBrands] = useState<IBrand[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();

  const searchProducts = async (query: string) => {
    setLoading({ ...loading, products: true });
    try {
      const result = await fetchProducts({
        params: { search: query, per_page: 3 },
      });

      setProducts(result.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ ...loading, products: false });
    }
  };

  const searchMarks = async (query: string) => {
    setLoading({ ...loading, marks: true });
    try {
      const result = await fetchBrands({
        params: { search: query, per_page: 3 },
      });

      setBrands(result.brands);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ ...loading, marks: false });
    }
  };

  const handleInternalSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        await Promise.all([searchProducts(query), searchMarks(query)]);
      }, DEBOUNCE_TIME_MS),
    [],
  );

  const handleExpand = () => {
    setIsExpanded(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleCollapse = () => {
    if (!searchQuery.trim()) {
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      handleInternalSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    } else if (e.key === 'Escape') {
      handleCollapse();
    }
  };

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isExpanded) {
      handleExpand();
    } else {
      handleSearch(searchQuery);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      handleCollapse();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles['search'],
        isExpanded && styles['search--expanded'],
        className,
      )}
      onBlur={handleBlur}
    >
      <div className={styles['search-input-wrapper']}>
        <input
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
          disabled={loading.products || loading.marks}
        />
      </div>
      <Button
        onClick={handleSearchButtonClick}
        className={styles['search-button']}
        variant='blank'
        disabled={loading.products || loading.marks}
        // aria-label={isExpanded ? t('search') : t('expandSearch')}
      >
        {loading.products || loading.marks ? '...' : <SearchIcon />}
      </Button>
    </div>
  );
};

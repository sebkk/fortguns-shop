'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { Spinner } from '@/components/Spinner';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { useMounted } from '@/hooks/useMounted';
import { IBrand } from '@/types/brands';
import { IProductSearch } from '@/types/product';

import { ISearchResult, SEARCH_LISTBOX_ID } from '../Search';
import styles from './SearchDropdown.module.scss';
import { SearchDropdownGroup } from './SearchDropdownGroup';
import { BrandItem } from './SearchDropdownGroup/BrandItem';
import { ProductItem } from './SearchDropdownGroup/ProductItem';

interface SearchDropdownProps {
  isVisible: boolean;
  isLoading: boolean;
  products: ISearchResult<IProductSearch>;
  brands: ISearchResult<IBrand>;
  searchQuery: string;
  handleCloseDropdown: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
}

export const SearchDropdown = ({
  isVisible,
  isLoading,
  products,
  brands,
  searchQuery,
  handleCloseDropdown,
  parentRef,
  activeIndex,
}: SearchDropdownProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const t = useTranslations();
  const isMounted = useMounted();

  useEffect(() => {
    if (isVisible && parentRef.current) {
      const updatePosition = () => {
        const rect = parentRef.current?.getBoundingClientRect();
        if (rect) {
          setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
      };

      updatePosition();
    }
  }, [isVisible, parentRef]);

  useEffect(() => {
    if (isVisible) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCloseDropdown();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible]);

  if (!isMounted || !isVisible || !searchQuery.trim()) {
    return null;
  }

  const hasResults =
    (products.items?.length || 0) > 0 || (brands.items?.length || 0) > 0;
  const isSearching = isLoading && searchQuery.trim().length > 0;

  const dropdownContent = (
    <div
      id={SEARCH_LISTBOX_ID}
      role='listbox'
      aria-label={t('search')}
      className={styles['search-dropdown']}
      style={
        {
          '--search-dropdown-width': `${position.width}px`,
          '--search-dropdown-top': `${position.top}px`,
          '--search-dropdown-left': `${position.left}px`,
        } as React.CSSProperties
      }
    >
      {isSearching ? (
        <Spinner showText className={styles['search-dropdown__spinner']} />
      ) : hasResults ? (
        <div className={styles['search-dropdown__content']}>
          {(products.items?.length as number) > 0 && (
            <SearchDropdownGroup
              title={t('products')}
              itemsLength={products.totalProducts}
              href={
                {
                  pathname: NAVIGATION_ROUTE.PRODUCTS_LISTING,
                  query: { search: searchQuery },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any
              }
            >
              <ul className={styles['search-dropdown__products-content-list']}>
                {products.items?.map((product, index) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    optionIndex={index}
                    isActive={activeIndex === index}
                  />
                ))}
              </ul>
            </SearchDropdownGroup>
          )}

          {(brands.items?.length as number) > 0 && (
            <SearchDropdownGroup
              title={t('brands')}
              itemsLength={brands.totalProducts}
              href={NAVIGATION_ROUTE.BRANDS}
            >
              <ul className={styles['search-dropdown__content-list']}>
                {brands.items?.map((brand, index) => {
                  const optionIndex = (products.items?.length || 0) + index;

                  return (
                    <BrandItem
                      key={brand.id}
                      brand={brand}
                      optionIndex={optionIndex}
                      isActive={activeIndex === optionIndex}
                    />
                  );
                })}
              </ul>
            </SearchDropdownGroup>
          )}
        </div>
      ) : (
        <div className={styles['search-dropdown__no-results']}>
          <p>{t('noResultsFound')}</p>
        </div>
      )}
    </div>
  );

  return createPortal(dropdownContent, document.body);
};

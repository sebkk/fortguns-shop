'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { Spinner } from '@/components/Spinner';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { useMounted } from '@/hooks/useMounted';
import { IBrand } from '@/types/brands';
import { IProduct } from '@/types/product';

import { ISearchResult } from '../Search';
import styles from './SearchDropdown.module.scss';
import { SearchDropdownGroup } from './SearchDropdownGroup';
import { BrandItem } from './SearchDropdownGroup/BrandItem';
import { ProductItem } from './SearchDropdownGroup/ProductItem';

interface SearchDropdownProps {
  isVisible: boolean;
  isLoading: boolean;
  products: ISearchResult<IProduct>;
  brands: ISearchResult<IBrand>;
  searchQuery: string;
  onItemClick?: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

export const SearchDropdown = ({
  isVisible,
  isLoading,
  products,
  brands,
  searchQuery,
  onItemClick,
  parentRef,
}: SearchDropdownProps) => {
  const t = useTranslations();
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

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

      // Update position on scroll and resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, parentRef]);

  if (!isMounted || !isVisible || !searchQuery.trim()) {
    return null;
  }

  const hasResults = products.items.length > 0 || brands.items.length > 0;
  const isSearching = isLoading && searchQuery.trim().length > 0;

  const dropdownContent = (
    <div
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
        <Spinner showText />
      ) : hasResults ? (
        <div className={styles['search-dropdown__content']}>
          {products.items.length > 0 && (
            <SearchDropdownGroup
              title={t('products')}
              itemsLength={products.totalProducts}
              href={NAVIGATION_ROUTE.PRODUCTS_LISTING}
            >
              {products.items.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </SearchDropdownGroup>
          )}

          {brands.items.length > 0 && (
            <SearchDropdownGroup
              title={t('brands')}
              itemsLength={brands.totalProducts}
              href={NAVIGATION_ROUTE.BRANDS}
            >
              {brands.items.map((brand) => (
                <BrandItem key={brand.id} brand={brand} />
              ))}
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

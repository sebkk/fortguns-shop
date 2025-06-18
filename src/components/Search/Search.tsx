'use client';

import { useRef, useState } from 'react';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/components/_icons/SearchIcon';
import { Button } from '@/components/Button';

import styles from './styles.module.scss';

interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

// TODO: FIX SEARCH

export const Search = ({
  onSearch,
  placeholder,
  className,
  initialValue = '',
}: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const t = useTranslations();

  // Handle focus/blur with timeout to allow button click
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Only collapse if focus moves outside the wrapper
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current && !isFocused) {
      setIsFocused(true);
      inputRef.current.focus();
      return;
    }
    handleSearch();
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles['search'],
        isFocused && styles['search--focused'],
        className,
      )}
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className={styles['search-input-wrapper']}>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder || t('search')}
          className={styles['search-input']}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          tabIndex={isFocused ? 0 : -1}
          style={{ pointerEvents: isFocused ? 'auto' : 'none' }}
        />
      </div>
      <Button
        onClick={handleClick}
        className={styles['search-button']}
        variant='blank'
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

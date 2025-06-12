import { Button } from '@/components/Button';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Select } from '../_form/Select';
import { ArrowIcon } from '../_icons/ArrowIcon';
import styles from './styles.module.scss';

const DOTS = '...';

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}

const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps): (string | number)[] => {
  if (totalPages <= 0) return [];
  const current = Math.max(1, Math.min(currentPage, totalPages));

  const totalPageNumbersToDisplay = siblingCount + 5;

  if (totalPages <= totalPageNumbersToDisplay) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  wrapperClassName?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  wrapperClassName = '',
}) => {
  const t = useTranslations();

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label='Pagination' className={clsx(wrapperClassName)}>
      <ul className={styles['pagination']}>
        <li>
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label={t('prevPage')}
            variant='outlined'
            className={styles['pagination-button']}
          >
            <ArrowIcon
              className={clsx(
                styles['pagination-arrow'],
                styles['pagination-arrow--first'],
              )}
            />
          </Button>
        </li>

        {paginationRange.map((pageItem, index) => {
          if (pageItem === DOTS) {
            return (
              <li key={`${DOTS}-${index}`} aria-hidden='true'>
                <Select
                  selectProps={{
                    defaultValue: '...',
                    onChange: (e) => {
                      const value = e.target.value;
                      if (value !== '...') {
                        handlePageClick(Number(value));
                      }
                    },
                  }}
                  placeholder={DOTS}
                  options={Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        !paginationRange.includes(page) &&
                        page !== 1 &&
                        page !== totalPages,
                    )
                    .map((page) => ({
                      value: page.toString(),
                      label: page.toString(),
                    }))}
                  id='pagination-select'
                  wrapperClassName={clsx(styles['pagination-select'])}
                  className={styles['pagination-button']}
                />
              </li>
            );
          }

          const pageNumber = pageItem as number;
          return (
            <li key={pageNumber}>
              <Button
                onClick={() => handlePageClick(pageNumber)}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                aria-label={t('navigateToPage', { pageNumber: pageNumber })}
                type='button'
                variant={currentPage === pageNumber ? 'filled' : 'outlined'}
                className={styles['pagination-button']}
              >
                {pageNumber}
              </Button>
            </li>
          );
        })}

        <li>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label={t('nextPage')}
            variant='outlined'
            className={styles['pagination-button']}
          >
            <ArrowIcon
              className={clsx(
                styles['pagination-arrow'],
                styles['pagination-arrow--last'],
              )}
            />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

import { useTranslations } from 'next-intl';

import { Select } from '@/components/_form/Select';
import { Pagination } from '@/components/Pagination';
import { PER_PAGE_OPTIONS } from '@/constants/products';

import styles from './PaginationWithCount.module.scss';

interface IPaginationWithCountProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectId: string;
  onPerPageChange: (perPage: number) => void;
  currentPerPage: number;
}

export const PaginationWithCount = ({
  currentPage,
  totalPages,
  onPageChange,
  onPerPageChange,
  selectId,
  currentPerPage,
}: IPaginationWithCountProps) => {
  const t = useTranslations();

  return (
    <div className={styles['pagination-with-count-wrapper']}>
      <Select
        id={selectId}
        label={`${t('perPage')}:`}
        options={PER_PAGE_OPTIONS.map(({ value, label }) => ({
          value: value.toString(),
          label: label.toString(),
        }))}
        selectProps={{
          value: currentPerPage.toString(),
          onChange: (e) => {
            onPerPageChange(Number(e.target.value));
          },
        }}
        wrapperClassName={styles['pagination-with-count-select-wrapper']}
        labelClassName={
          styles['pagination-with-count-select-wrapper--select-label']
        }
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        wrapperClassName={styles['pagination-with-count-pagination-wrapper']}
      />
    </div>
  );
};

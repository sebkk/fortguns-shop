import { useTranslations } from 'next-intl';

import { Select } from '@/components/_form/Select';
import { ProductsCount } from '@/components/ProductsCount';
import { SortOption } from '@/types/filters';

import styles from './ProductsHeader.module.scss';

interface IProductsHeaderProps {
  pageNumber: number;
  totalProducts: number;
  currentSort: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOptions: SortOption[];
  currentPerPage: number;
  noProducts?: boolean;
}

export const ProductsHeader = ({
  pageNumber,
  totalProducts,
  currentSort,
  handleSortChange,
  sortOptions,
  currentPerPage,
  noProducts,
}: IProductsHeaderProps) => {
  const t = useTranslations();

  return (
    <div className={styles['header-bar']}>
      <div className={styles['header-bar-inner']}>
        <ProductsCount
          pageNumber={pageNumber}
          totalProducts={+totalProducts}
          perPage={currentPerPage}
        />
        {!noProducts && (
          <div className={styles['controls-container']}>
            <Select
              label={t('sorting')}
              selectProps={{ value: currentSort, onChange: handleSortChange }}
              id='products-sort'
              options={sortOptions.map((option) => ({
                ...option,
                label: t(option.label),
              }))}
              wrapperClassName={styles['sort-select-wrapper']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

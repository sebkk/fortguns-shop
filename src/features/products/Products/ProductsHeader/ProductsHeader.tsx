import { ProductsCount } from '@/components/ProductsCount';
import { Select } from '@/components/_form/Select';

import { SortOption } from '../Products';

import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

interface IProductsHeaderProps {
  pageNumber: number;
  totalProducts: number;
  currentSort: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOptions: SortOption[];
}

export const ProductsHeader = ({
  pageNumber,
  totalProducts,
  currentSort,
  handleSortChange,
  sortOptions,
}: IProductsHeaderProps) => {
  const t = useTranslations();

  return (
    <div className={styles['header-bar']}>
      <div className={styles['header-bar-inner']}>
        <ProductsCount pageNumber={pageNumber} totalProducts={+totalProducts} />
        <div className={styles['controls-container']}>
          <Select
            label={t('sorting')}
            selectProps={{ value: currentSort, onChange: handleSortChange }}
            id='products-sort'
            options={sortOptions}
            wrapperClassName={styles['sort-select-wrapper']}
          />
        </div>
      </div>
    </div>
  );
};

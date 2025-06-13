import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

interface IProductsCountProps {
  pageNumber: number;
  totalProducts: number;
  perPage?: number;
}

export const ProductsCount = ({
  pageNumber,
  totalProducts,
  perPage = 12,
}: IProductsCountProps) => {
  const t = useTranslations();

  const startProductsNumber = (pageNumber - 1) * perPage + 1;
  const endProductsNumber = Math.min(pageNumber * perPage, totalProducts);
  const productsCountStartEnd = `${startProductsNumber}-${endProductsNumber}`;

  if (!totalProducts) {
    return <p className={styles['products-count']}>{t('noProducts')}</p>;
  }

  return (
    <p className={styles['products-count']}>
      {t('productsCount', {
        productsCount: productsCountStartEnd,
        allProductsCount: totalProducts,
      })}
    </p>
  );
};

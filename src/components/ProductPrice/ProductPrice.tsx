import { IProduct } from '@/types/product';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

interface IProductPrice {
  price: string;
  salePrice: string | null;
  className?: string;
  stockStatus: IProduct['stock_status'];
}

export const ProductPrice = ({
  price,
  salePrice,
  className,
  stockStatus,
}: IProductPrice) => {
  const t = useTranslations();

  if (stockStatus === 'outofstock') {
    return (
      <p
        className={clsx(
          styles['product-price'],
          styles['product-price--out-of-stock'],
          className,
        )}
      >
        {t('outOfStock')}
      </p>
    );
  }
  return (
    <p className={clsx(styles['product-price'], className)}>
      {price ? `${price} zł` : t('noPrice')}
    </p>
  );
};

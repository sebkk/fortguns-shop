import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { IProduct } from '@/types/product';

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

  const priceValue = salePrice || price; // TODO: ADD DISPLAYING OLD PRICE

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
      {priceValue ? `${Number(priceValue).toFixed(2)} zł` : t('noPrice')}
    </p>
  );
};

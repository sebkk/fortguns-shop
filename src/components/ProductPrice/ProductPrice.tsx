import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { formatPrice } from '@/helpers/price/formatPrice';
import { IProduct } from '@/types/product';

import styles from './styles.module.scss';

interface IProductPrice {
  price: string;
  salePrice: string | null;
  className?: string;
  wrapperClassName?: string;
  stockStatus: IProduct['stock_status'];
  size?: 'x-small' | 'small' | 'large';
}

export const ProductPrice = ({
  price,
  salePrice,
  className,
  wrapperClassName,
  stockStatus,
  size = 'small',
}: IProductPrice) => {
  const t = useTranslations();

  const isPrice = +price > 0 || (salePrice && +salePrice > 0);

  const isSalePrice = salePrice && +salePrice > 0 && +salePrice < +price;

  const priceValue = isSalePrice ? salePrice : price;

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
    <div className={clsx(styles['product-price-container'], wrapperClassName)}>
      <p
        className={clsx(
          styles['product-price'],
          styles[`product-price--${size}`],
          className,
        )}
      >
        {isPrice ? formatPrice(priceValue) : t('noPrice')}
      </p>
      {isSalePrice && (
        <p
          className={clsx(
            styles['product-price'],
            styles['product-price--old'],
            styles[`product-price--old--${size}`],
            className,
          )}
        >
          {formatPrice(price)}
        </p>
      )}
    </div>
  );
};

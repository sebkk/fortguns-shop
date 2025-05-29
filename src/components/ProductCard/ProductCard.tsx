'use client';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { IProduct } from '@/types/product';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const t = useTranslations();

  const { images, price, sale_price, categories, name, slug } = product || {};

  const firstImage = images?.[0];
  const categoryName = categories?.[1]?.name || categories?.[0]?.name || '';

  console.log(product);
  const priceToDisplay = sale_price || price;

  return (
    <article className={styles['product-card']}>
      {firstImage && (
        <div className={styles['image-wrapper']}>
          <Image
            src={firstImage.src}
            alt={firstImage.alt || name || 'Product image'}
            width={300}
            height={300}
            className={styles['product-image']}
          />
        </div>
      )}
      <div className={styles['content-wrapper']}>
        <div className={styles['info-section']}>
          <Link
            href={`/product/${slug}`}
            className={styles['product-name-link']}
          >
            {name}
          </Link>
          {categoryName && (
            <p className={styles['product-category']}>{categoryName}</p>
          )}
        </div>

        <div className={styles['actions-section']}>
          {
            <p className={styles['product-price']}>
              {priceToDisplay ? `${priceToDisplay} zł` : t('noPrice')}
            </p>
          }
          <Button className={styles['product-button']} size='small'>
            {t('showProduct')}
          </Button>
        </div>
      </div>
    </article>
  );
};

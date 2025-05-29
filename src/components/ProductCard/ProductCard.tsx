'use client';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { IProduct } from '@/types/product';

import styles from './styles.module.scss';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { images, price, sale_price, categories, name } = product || {};

  const firstImage = images?.[0];
  const categoryName = categories?.[1]?.name || categories?.[0]?.name || '';

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
          <a href='#' className={styles['product-name-link']}>
            {name}
          </a>
          {categoryName && (
            <p className={styles['product-category']}>{categoryName}</p>
          )}
        </div>

        <div className={styles['actions-section']}>
          <p className={styles['product-price']}>{sale_price || price} zł</p>
          <Button className={styles['product-button']} size='small'>
            Pokaż produkt
          </Button>
        </div>
      </div>
    </article>
  );
};

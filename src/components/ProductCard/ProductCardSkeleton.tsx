import { Skeleton } from '@/components/Skeleton/Skeleton';

import styles from './styles.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <article className={styles['product-card']}>
      <div className={styles['image-wrapper']}>
        <Skeleton
          variant='rounded'
          width='100%'
          height='100%'
          className={styles['skeleton-image']}
        />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles['info-section']}>
          <Skeleton
            variant='rounded'
            width='80%'
            height={24}
            className={styles['skeleton-title']}
          />
          <Skeleton
            variant='rounded'
            width='60%'
            height={20}
            className={styles['skeleton-categories']}
          />
        </div>
        <div className={styles['actions-section']}>
          <Skeleton
            variant='rounded'
            width='40%'
            height={24}
            className={styles['skeleton-price']}
          />
          <Skeleton
            variant='rounded'
            width='100%'
            height={40}
            className={styles['skeleton-button']}
          />
        </div>
      </div>
    </article>
  );
};

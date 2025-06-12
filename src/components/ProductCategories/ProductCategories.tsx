import { Link } from '@/components/Link';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { IProductCategory } from '@/types/product';

import { UNCATEGORIZED_CATEGORY_NAME } from '@/constants/products';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProductCategoriesProps {
  categories: IProductCategory[];
  size?: 'small' | 'large';
  className?: string;
  classNameWrapper?: string;
  asLink?: boolean;
}

export const ProductCategories = ({
  categories,
  size = 'large',
  className,
  classNameWrapper,
  asLink,
}: IProductCategoriesProps) => {
  const filteredCategories = categories.filter(
    (category) => category.name !== UNCATEGORIZED_CATEGORY_NAME,
  );

  if (!filteredCategories.length) return null;
  return (
    <ul className={clsx(styles['product-categories'], classNameWrapper)}>
      {filteredCategories.map(({ name, slug }, index, array) => (
        <li
          className={clsx(
            styles['product-categories-item'],
            styles[`product-categories-item--${size}`],
            index !== array.length - 1 &&
              styles['product-categories-item--with-border'],
            className,
          )}
          key={name}
        >
          {asLink ? (
            <Link href={`${NAVIGATION_ROUTE.PRODUCTS_LISTING}/${slug}`}>
              {name}
            </Link>
          ) : (
            <span>{name}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

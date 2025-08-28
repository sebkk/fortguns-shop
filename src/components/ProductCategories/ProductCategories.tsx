import clsx from 'clsx';

import { Link } from '@/components/Link';
import { NAVIGATION_ROUTE } from '@/constants/navigation';
import { UNCATEGORIZED_CATEGORY_NAME } from '@/constants/products';
import { IProductCategory } from '@/types/product';

import styles from './styles.module.scss';

interface IProductCategoriesProps {
  categories: IProductCategory[];
  size?: 'x-small' | 'small' | 'large';
  className?: string;
  classNameWrapper?: string;
  asLink?: boolean;
  showFirstCategory?: boolean;
}

export const ProductCategories = ({
  categories,
  size = 'large',
  className,
  classNameWrapper,
  asLink,
  showFirstCategory,
}: IProductCategoriesProps) => {
  const filteredCategories = categories.filter(
    (category) => category.name !== UNCATEGORIZED_CATEGORY_NAME,
  );

  if (!filteredCategories.length) return null;

  let categoriesToRender = filteredCategories;

  if (showFirstCategory && filteredCategories.length > 1) {
    categoriesToRender = filteredCategories.slice(0, 1);
  }

  return (
    <ul className={clsx(styles['product-categories'], classNameWrapper)}>
      {categoriesToRender.map(({ name, slug }, index, array) => (
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

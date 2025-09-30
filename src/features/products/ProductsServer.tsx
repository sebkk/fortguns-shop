import { ICategory } from '@/types/categories';
import { IProductListing } from '@/types/product';

import { Products } from './Products';

interface IProductsServerProps {
  pageNumber?: number;
  totalPages?: number;
  totalProducts?: number;
  products?: IProductListing[];
  pageTitle?: string;
  pageDescription?: string;
  category?: ICategory;
  brandId?: number;
}

export const ProductsServer = (props: IProductsServerProps) => {
  return <Products {...props} />;
};

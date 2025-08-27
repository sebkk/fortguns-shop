import { IProduct } from '@/types/product';

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem = ({}: ProductItemProps) => {
  return <div>ProductItem</div>;
};

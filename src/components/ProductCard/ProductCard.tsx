import Image from 'next/image';

import { Button } from '@/components/Button';
import { IProduct } from '@/types/product';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // console.log(product);

  const { images, price, sale_price, categories } = product || {};

  const firstImage = images[0];

  return (
    <article className='flex h-full flex-col items-center rounded-[20px] bg-white/5 p-5'>
      <div className='h-full max-h-48 w-full overflow-hidden'>
        <Image
          src={firstImage.src}
          alt={firstImage.alt}
          width={300}
          height={300}
          className='h-auto min-h-full w-auto bg-center object-cover'
        />
      </div>
      <div className='flex w-full flex-1 flex-col gap-4 pt-2'>
        <div>
          <a
            href='#'
            className='text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white'
          >
            {product.name}
          </a>
          <p className='text-text-dark'>{categories[1]?.name}</p>
        </div>

        <div className='mt-auto flex flex-col items-start justify-between gap-2'>
          <p className='text-2xl font-extrabold leading-tight text-gray-900 dark:text-white'>
            {sale_price ? sale_price : price} zł
          </p>
          <Button className='w-full' size='small'>
            Pokaż produkt
          </Button>
        </div>
      </div>
    </article>
  );
};

import Image from 'next/image';

interface ProductCardProps {
  product: { images: [{ src: string; alt: string }]; name: string };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product);

  const { images } = product || {};

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
      <div className='flex w-full flex-1 flex-col pt-6'>
        <a
          href='#'
          className='text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white'
        >
          {product.name}
        </a>

        <div className='mt-auto flex items-center justify-between gap-4'>
          <p className='text-2xl font-extrabold leading-tight text-gray-900 dark:text-white'>
            $1,699
          </p>

          <button
            type='button'
            className='bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4'
          >
            Show product
          </button>
        </div>
      </div>
    </article>
  );
};

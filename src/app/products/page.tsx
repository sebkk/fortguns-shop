'use client';

import { useCallback, useEffect, useState } from 'react';

import productsApi from '@/api/woocommerce/products';
import { Select } from '@/components/_form/Select';
import { Button } from '@/components/Button'; // Załóżmy, że masz komponent Button
import { Drawer } from '@/components/Drawer'; // Importujemy nasz nowy komponent Drawer
import { ProductCard } from '@/components/ProductCard';
import { Spacer } from '@/components/Spacer';
import { IProduct } from '@/types/product';

type SortOption = {
  value: string;
  label: string;
  orderby?:
    | 'date'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating';
  order?: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { value: 'default', label: 'Domyślnie' },
  {
    value: 'price-asc',
    label: 'Cena: Rosnąco',
    orderby: 'price',
    order: 'asc',
  },
  {
    value: 'price-desc',
    label: 'Cena: Malejąco',
    orderby: 'price',
    order: 'desc',
  },
  { value: 'name-asc', label: 'Nazwa: A-Z', orderby: 'title', order: 'asc' },
  { value: 'name-desc', label: 'Nazwa: Z-A', orderby: 'title', order: 'desc' },
  { value: 'date-desc', label: 'Najnowsze', orderby: 'date', order: 'desc' },
  {
    value: 'popularity',
    label: 'Popularność',
    orderby: 'popularity',
    order: 'desc',
  },
];

const ProductsPage = () => {
  const [productsData, setProductsData] = useState<IProduct[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<string>('default');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const fetchProducts = useCallback(async (sortValue: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const selectedSortOption = sortOptions.find(
        (opt) => opt.value === sortValue,
      );
      const params =
        selectedSortOption && selectedSortOption.value !== 'default'
          ? {
              orderby: selectedSortOption.orderby,
              order: selectedSortOption.order,
            }
          : {};

      const res = await productsApi.getProducts(params);
      setProductsData(res.data as IProduct[]);
      setTotalPages(
        parseInt(res.headers['x-wp-totalpages'] || '0', 10) || res.data.length,
      );
    } catch (err) {
      console.error(err);
      setError('Nie udało się załadować produktów.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentSort);
  }, [currentSort, fetchProducts]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSort(event.target.value);
  };

  if (isLoading && !productsData) {
    return (
      <div className='container px-4 py-8 text-center'>
        Ładowanie produktów...
      </div>
    );
  }

  if (error) {
    return (
      <div className='container px-4 py-8 text-center text-error'>{error}</div>
    );
  }

  const productsCount = Array.isArray(productsData) ? productsData.length : 0;

  return (
    <>
      <Spacer />
      <div className='bg-background-light'>
        <div className='container flex flex-wrap items-center justify-between gap-4 px-6 py-4'>
          <p className='text-xl'>{`${totalPages || productsCount} produktów`}</p>
          <div className='flex items-center gap-4'>
            <Select
              label='Sortowanie'
              selectProps={{ value: currentSort, onChange: handleSortChange }}
              id='products-sort'
              options={sortOptions}
              wrapperClassName='flex mb-0 '
            />
            <Button
              onClick={() => setIsDrawerOpen(true)}
              variant='outlined'
              color='primary'
              className='min-w-28'
            >
              Filtry
            </Button>
          </div>
        </div>
      </div>
      <div className='container flex flex-col px-4'>
        <Spacer size='md' />
        {isLoading && <div className='py-4 text-center'>Odświeżanie...</div>}
        {!isLoading && productsData && productsData.length > 0 ? (
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          !isLoading && (
            <p className='text-center'>Brak produktów do wyświetlenia.</p>
          )
        )}
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title='Filtruj Produkty'
      >
        {/* Tutaj możesz dodać komponenty filtrów */}
        <p className='text-white'>
          Miejsce na filtry (np. kategorie, zakres cenowy).
        </p>
        <Button onClick={() => setIsDrawerOpen(false)} className='mt-4'>
          Zastosuj filtry (placeholder)
        </Button>
      </Drawer>
    </>
  );
};

export default ProductsPage;

// import products from '@/api/woocommerce/products';
// import { ProductCard } from '@/components/ProductCard';
// import { Spacer } from '@/components/Spacer';
// import { IProduct } from '@/types/product';

// const ProductsPage = async () => {
//   const fetchProducts = async () => {
//     try {
//       const res = await products.getProducts();

//       return { data: res.data, totalPages: res.headers['x-wp-total'] || 0 };
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const { data: productsData, totalPages } = (await fetchProducts()) || {};

//   return (
//     <>
//       <Spacer />
//       <div className='bg-background-light'>
//         <div className='container flex justify-between px-6 py-4'>
//           <p className='text-xl'>{`${totalPages} products`}</p>
//         </div>
//       </div>
//       <div className='container flex flex-col px-4'>
//         <Spacer size='md' />
//         <ul className='grid grid-cols-4 gap-3'>
//           {productsData.map((product: IProduct) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default ProductsPage;

import { SortOption } from '@/types/filters';
import { PRODUCTS_ORDER, PRODUCTS_ORDER_BY } from '@/types/product';

export const PRODUCTS_FIELDS = [
  'id',
  'name',
  'regular_price',
  'sale_price',
  'images',
  'slug',
  'stock_status',
  'categories',
  'brands',
  'date_created',
];

export const PRODUCT_DETAILS_FIELDS = [
  ...PRODUCTS_FIELDS,
  'description',
  'related_ids',
];

export const UNCATEGORIZED_CATEGORY_NAME = 'Uncategorized';
export const PER_PAGE_DEFAULT = 12;

export const PER_PAGE_OPTIONS = [
  { value: PER_PAGE_DEFAULT, label: PER_PAGE_DEFAULT },
  { value: PER_PAGE_DEFAULT * 2, label: PER_PAGE_DEFAULT * 2 },
  { value: PER_PAGE_DEFAULT * 3, label: PER_PAGE_DEFAULT * 3 },
  { value: PER_PAGE_DEFAULT * 4, label: PER_PAGE_DEFAULT * 4 },
  { value: PER_PAGE_DEFAULT * 5, label: PER_PAGE_DEFAULT * 5 },
];

export const SORT_OPTIONS: SortOption[] = [
  { value: 'default', label: 'labelDefault' },
  {
    value: 'price-asc',
    label: 'labelPriceAsc',
    orderby: PRODUCTS_ORDER_BY.PRICE,
    order: PRODUCTS_ORDER.ASC,
  },
  {
    value: 'price-desc',
    label: 'labelPriceDesc',
    orderby: PRODUCTS_ORDER_BY.PRICE,
    order: PRODUCTS_ORDER.DESC,
  },
  {
    value: 'date-desc',
    label: 'labelNewest',
    orderby: PRODUCTS_ORDER_BY.DATE,
    order: PRODUCTS_ORDER.DESC,
  },
  {
    value: 'popularity-desc',
    label: 'labelPopularity',
    orderby: PRODUCTS_ORDER_BY.POPULARITY,
    order: PRODUCTS_ORDER.DESC,
  },
];

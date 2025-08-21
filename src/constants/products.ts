import { SortOption } from '@/types/filters';

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
    orderby: 'price',
    order: 'asc',
  },
  {
    value: 'price-desc',
    label: 'labelPriceDesc',
    orderby: 'price',
    order: 'desc',
  },
  { value: 'date-desc', label: 'labelNewest', orderby: 'date', order: 'desc' },
  {
    value: 'popularity',
    label: 'labelPopularity',
    orderby: 'popularity',
    order: 'desc',
  },
];

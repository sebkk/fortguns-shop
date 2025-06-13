export type SortOption = {
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

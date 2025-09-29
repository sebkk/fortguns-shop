export interface ICategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    date_created: string;
    src: string;
    name: string;
    alt: string;
  };
  count: number;
  menu_order: number;
  _links: {
    self: {
      href: string;
    }[];
  };
}

export interface IGetCategoriesParams {
  per_page?: number;
  page?: number;
  search?: string;
  slug?: string;
  _fields?: string;
}

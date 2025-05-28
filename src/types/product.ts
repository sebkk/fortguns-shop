interface IProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface IProductImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

interface IProductAttributeOption {
  id?: number;
  name: string;
  slug: string;
}

interface IProductAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface IProductDimensions {
  length: string;
  width: string;
  height: string;
}

interface IProductMetaData {
  id: number;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | boolean | any[];
}

interface IProductAuthorInfo {
  display_name: string;
  author_link: string;
}

interface IProductLink {
  href: string;
  targetHints?: {
    allow: string[];
  };
}

interface IProductLinks {
  self: IProductLink[];
  collection: IProductLink[];
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string | null;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: IProductDimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: IProductCategory[];
  // tags: any[];
  images: IProductImage[];
  attributes: IProductAttribute[];
  default_attributes: IProductAttributeOption[];
  // variations: any[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: IProductMetaData[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  global_unique_id: string;
  // uagb_featured_image_src: any[];
  uagb_author_info: IProductAuthorInfo;
  uagb_comment_info: number;
  uagb_excerpt: string;
  jetpack_sharing_enabled: boolean;
  // brands: any[];
  _links: IProductLinks;
}

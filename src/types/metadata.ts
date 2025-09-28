import { Metadata } from 'next';
import { Graph } from 'schema-dts';

export interface IMetaAttributes {
  name?: string;
  content?: string;
  property?: string;
  rel?: string;
  href?: string;
  type?: string;
  class?: string;
}

export interface IHeadContentWithContent {
  type: 'title';
  content: string[];
}

export interface IHeadContentWithAttributes {
  type: 'meta' | 'link';
  attributes: IMetaAttributes;
}

export interface IHeadContentWithScript {
  type: 'script';
  content: string[];
  attributes: IMetaAttributes;
}

export type THeadContentItem =
  | IHeadContentWithContent
  | IHeadContentWithAttributes
  | IHeadContentWithScript
  | string;

export interface IHeadObject {
  type: 'head';
  content: THeadContentItem[];
}

export type TMetadataTransformResult = {
  scripts: Array<{ type: string; content: string }>;
} & Metadata;

export interface IMetadataScripts {
  type: 'application/ld+json';
  content: Graph;
}

export enum TMetadataType {
  DEFAULT_PAGE = 'defaultPage',
  DYNAMIC_PAGE = 'dynamicPage',
  PRODUCT_PAGE = 'productPage',
  PRODUCT_CATEGORY_PAGE = 'productCategoryPage',
  BRAND_PAGE = 'brandPage',
}

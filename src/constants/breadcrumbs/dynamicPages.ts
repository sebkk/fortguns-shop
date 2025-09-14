import { HOMEPAGE_BREADCRUMB } from './homepage';

export const DYNAMIC_PAGE_BREADCRUMB = (pageTitle: string) => ({
  label: pageTitle,
  isActive: true,
  shouldTranslate: false,
});

export const DYNAMIC_PAGE_BREADCRUMBS = (pageTitle: string) => [
  HOMEPAGE_BREADCRUMB,
  DYNAMIC_PAGE_BREADCRUMB(pageTitle),
];

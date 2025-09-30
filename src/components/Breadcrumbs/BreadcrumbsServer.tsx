import { Breadcrumbs } from './Breadcrumbs';
import { IBreadcrumbsProps } from './types';

export const BreadcrumbsServer = (props: IBreadcrumbsProps) => {
  return <Breadcrumbs {...props} />;
};

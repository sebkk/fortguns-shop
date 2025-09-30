import { Link } from './Link';
import { ILinkProps } from './types';

export const LinkServer = (props: ILinkProps) => {
  return <Link {...props} />;
};

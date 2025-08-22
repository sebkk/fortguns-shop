import { IPhoto } from './pages';

export interface IBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: IPhoto;
  count: number;
}

export interface IGetBrandsParams {
  per_page?: number;
  fields?: string;
  page?: number;
}

import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

interface IGetProductsParams {
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
}

class Products {
  private basePath = '/wp-json/wc/v3/products';

  public async getProducts(params?: IGetProductsParams) {
    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
      params: {
        ...params,
      },
    });
  }
}

const products = new Products();

export default products;

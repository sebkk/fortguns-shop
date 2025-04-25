import baseAPI from '..';

const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;

class Products {
  private basePath = '/wp-json/wc/v3/products';

  public async getProducts() {
    return await baseAPI.get(this.basePath, {
      auth: {
        username: consumerKey as string,
        password: consumerSecret as string,
      },
    });
  }
}

const products = new Products();

export default products;

import baseAPI from '.';

class RankMath {
  private readonly rankMathPath = '/wp-json/rankmath/v1';

  public async getMetadata(url: string) {
    const res = await baseAPI.get(`${this.rankMathPath}/getHead?url=${url}`);

    return res.data;
  }
}

const rankMath = new RankMath();

export default rankMath;

// import axios from 'axios';

import { ProductsCarousel } from '@/components/ProductsCarousel';
import { Spacer } from '@/components/Spacer';
import { Hero } from '@/features/homepage';
import { AboutUs } from '@/features/homepage/AboutUs';

import styles from './styles.module.scss';

// const getPages = async () => {
//   const WP_API_URL = 'https://fortguns.pl/wp-json/wp/v2';

//   const res = await axios(`${WP_API_URL}/pages`);

//   console.log(res);

//   return res.data;
// };

const Home = async () => {
  return (
    <div>
      <div className={styles['container']}>
        <Hero />
        <Spacer />
        <ProductsCarousel
          swiperConfig={{ loop: true, slidesPerView: 4, spaceBetween: 20 }}
        />
      </div>
      <Spacer />
      <AboutUs />
    </div>
  );
};

export default Home;

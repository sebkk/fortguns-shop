// import axios from 'axios';

import { ProductsCarousel } from '@/components/ProductsCarousel';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Spacer } from '@/components/Spacer';
import { ShootingRange } from '@/features/content/ShootingRange';
import { Hero } from '@/features/homepage';
import { AboutUs } from '@/features/homepage/AboutUs';

// const getPages = async () => {
//   const WP_API_URL = 'https://fortguns.pl/wp-json/wp/v2';

//   const res = await axios(`${WP_API_URL}/pages`);

//   console.log(res);

//   return res.data;
// };

const Home = async () => {
  return (
    <div>
      <div className='container'>
        <Hero />
        <Spacer />
        <SectionWrapper sectionHeadingProps={{ title: 'Najnowsze produkty' }}>
          <ProductsCarousel
            swiperConfig={{ loop: true, slidesPerView: 4, spaceBetween: 20 }}
          />
        </SectionWrapper>
      </div>
      <Spacer />
      <AboutUs />
      <Spacer />
      <ShootingRange />
      <Spacer />
    </div>
  );
};

export default Home;

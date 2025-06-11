// import axios from 'axios';

import { ProductsCarousel } from '@/components/ProductsCarousel';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Spacer } from '@/components/Spacer';
import { ShootingRange } from '@/features/content/ShootingRange';
import { Hero } from '@/features/homepage';
import { AboutUs } from '@/features/homepage/AboutUs';

const Home = async () => {
  return (
    <div>
      <div className='container'>
        <Hero />
        <Spacer />
        <SectionWrapper sectionHeadingProps={{ title: 'Najnowsze produkty' }}>
          <ProductsCarousel
            swiperConfig={{
              loop: true,
            }}
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

// import axios from 'axios';

import { ProductsCarousel } from '@/components/_carousels/ProductsCarousel';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Spacer } from '@/components/Spacer';
import { ShootingRange } from '@/features/content/ShootingRange';
import { Hero } from '@/features/homepage';
import { AboutUs } from '@/features/homepage/AboutUs';

import styles from './styles.module.scss';

const Home = async () => {
  return (
    <div className={styles['homepage-container']}>
      <Hero />
      <div className={styles['homepage-content-container']}>
        <div className='container'>
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
    </div>
  );
};

export default Home;

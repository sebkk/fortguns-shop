import { ProductsCarousel } from '@/components/ProductsCarousel';
import { Spacer } from '@/components/Spacer';
import { Hero } from '@/features/homepage';
import { AboutUs } from '@/features/homepage/AboutUs/AboutUs';

const Home = () => {
  return (
    <main className='p-0'>
      <div className='container px-4'>
        <Hero />
        <Spacer />
        <ProductsCarousel
          swiperConfig={{ loop: true, slidesPerView: 4, spaceBetween: 20 }}
        />
      </div>
      <Spacer />
      <AboutUs />
    </main>
  );
};

export default Home;

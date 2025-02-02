import { Hero } from '@/features/homepage';

const Home = () => {
  return (
    <main className='min-h-screen'>
      <Hero />
      <div className='z-10 h-[1080px]' />
    </main>
  );
};

export default Home;

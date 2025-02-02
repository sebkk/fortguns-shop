import { Button } from '@/components/Button';
import PublicLayout from '@/features/publicLayout/layout';

const Home = () => {
  return (
    <PublicLayout>
      <main className='h-full'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <Button>Testowy button</Button>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;

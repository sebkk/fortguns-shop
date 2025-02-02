import PublicLayout from '@/features/publicLayout/layout';

type userLayoutProps = {
  children: React.ReactNode;
};

const userLayout = async ({ children }: userLayoutProps) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default userLayout;

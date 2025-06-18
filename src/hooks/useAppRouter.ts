import { BProgress } from '@bprogress/core';

import { useRouter as useNextIntlRouter } from '@/i18n/navigation';

export const useAppRouter = () => {
  const router = useNextIntlRouter();

  const push = (...param: Parameters<typeof router.push>) => {
    BProgress.start();

    router.push(...param);
  };

  const replace = (...param: Parameters<typeof router.replace>) => {
    BProgress.start();
    router.replace(...param);
  };

  const back = () => {
    BProgress.start();
    router.back();
  };

  return {
    router,
    push,
    replace,
    back,
  };
};

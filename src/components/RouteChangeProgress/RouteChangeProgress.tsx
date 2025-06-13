'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { BProgress } from '@bprogress/core';

export const RouteChangeProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    BProgress.start();
  }, [pathname, searchParams]);

  return null;
};

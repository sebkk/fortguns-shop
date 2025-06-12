import { useEffect, useState } from 'react';

import { breakpoints } from '@/assets/styles/breakpoints';

type Breakpoint = keyof typeof breakpoints;

export const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) => {
    return width >= breakpoints[breakpoint];
  };

  return {
    width,
    isBreakpoint,
    isSmallScreen: !isBreakpoint('md'),
    isTablet: isBreakpoint('md') && !isBreakpoint('lg'),
    isDesktop: isBreakpoint('lg'),
  };
};

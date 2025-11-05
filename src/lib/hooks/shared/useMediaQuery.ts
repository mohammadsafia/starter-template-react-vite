import { useEffect, useMemo, useState } from 'react';

const BREAKPOINTS = {
  XS: 480,
  SM: 640,
  MD: 1024,
  LG: 1440,
  XL: 1500,
  '2XL': 1920,
  '3XL': 2526,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const useMediaQuery = () => {
  const [w, setW] = useState(window.innerWidth);

  const recalc = () => setW(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', recalc);

    return () => window.removeEventListener('resize', recalc);
  }, []);

  const matches = useMemo(() => {
    let res: Record<string, boolean> = {};
    Object.entries(BREAKPOINTS).forEach(([breakpoint, val]) => {
      res[`matchDown${breakpoint}`] = val > w;
      res[`matchUp${breakpoint}`] = val < w;
    });
    return res as { [K in Breakpoint as `matchDown${K}` | `matchUp${K}`]: boolean };
  }, [w]);

  return { recalc, ...matches };
};

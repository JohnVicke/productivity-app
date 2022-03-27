import { useTheme, useMediaQuery, Breakpoint } from '@mui/material';

export const useScreenType = () => {
  const theme = useTheme();
  const queries = (['sm', 'md', 'lg'] as Breakpoint[]).map(
    (b: Breakpoint) => `(min-width:${theme.breakpoints.values[b]}px)`
  );
  const isMobile = useMediaQuery(queries[0]);
  const isTablet = useMediaQuery(queries[1]);
  const isLaptop = useMediaQuery(queries[2]);

  if (isLaptop) return '3-cols';
  if (isTablet) return '2-cols';
  if (isMobile) return '1-cols';

  return 'fullscreen';
};

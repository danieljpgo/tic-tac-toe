import * as React from 'react';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

type Breakpoints = keyof typeof breakpoints;

export const useMediaQuery = (query: Breakpoints) => {
  const [matches, setMatches] = React.useState(false);

  React.useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoints[query]})`);
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', (event) => {
      setMatches(event.matches);
    });

    return () => mediaQuery.removeEventListener('change', (event) => {
      setMatches(event.matches);
    });
  }, []);
  return matches;
};

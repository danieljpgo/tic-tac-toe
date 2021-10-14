import mediaQuery from 'css-mediaquery';

export function createMatchMedia({ width, height }: {width?: number, height?: number}) {
  return (query: string): MediaQueryList => ({
    media: query,
    matches: mediaQuery.match(query, { width, height }),
    onchange: jest.fn(),
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
}

export function resize(size: {width?: number, height?: number}) {
  window.matchMedia = createMatchMedia(size);
  return window;
}

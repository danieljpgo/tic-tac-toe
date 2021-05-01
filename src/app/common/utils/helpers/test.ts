import mediaQuery from 'css-mediaquery';

export function createMatchMedia(size: {width?: number, height?: number}) {
  const { width, height } = size;
  return (query: string): MediaQueryList => ({
    media: query,
    matches: mediaQuery.match(query, { width, height }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    onchange: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  });
}

export function resize(size: {width?: number, height?: number}) {
  window.matchMedia = createMatchMedia(size);
  return window;
}

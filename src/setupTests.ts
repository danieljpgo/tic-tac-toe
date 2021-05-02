import '@testing-library/jest-dom';

Object.defineProperty(SVGElement.prototype, 'getTotalLength', {
  value: () => 1,
});

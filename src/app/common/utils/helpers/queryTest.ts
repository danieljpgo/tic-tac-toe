import { queries, Screen } from '@testing-library/react';

export const getByTextParent = (display: Screen<typeof queries>, query: string) => (
  display.getByText((_, element) => element?.textContent === query)
);

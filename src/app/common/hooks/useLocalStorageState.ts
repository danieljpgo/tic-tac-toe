import * as React from 'react';

/**
 * useLocalstorageState hook
 * @param {String} key The key to set in localStorage for this value
 * @param {any} initialState The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and
 * deserialize functions to use(defaults to JSON.stringify and JSON.parse respectively)
 */

export const useLocalStorageState = <T>(
  key: string,
  initialState: T,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = {},
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = React.useState(() => {
    const init = typeof initialState === 'function' ? initialState() : initialState;
    try {
      const valueInLocalStorage = window.localStorage.getItem(key);
      return valueInLocalStorage
        ? deserialize(valueInLocalStorage)
        : init;
    } catch (error) {
      return init;
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

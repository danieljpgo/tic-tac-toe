import * as React from 'react';

export const useLocalStorageState = <T>(
  key: string,
  initialState: T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = React.useState(() => {
    const init = typeof initialState === 'function' ? initialState() : initialState;
    try {
      const valueInLocalStorage = window.localStorage.getItem(key);
      return valueInLocalStorage ? deserialize(valueInLocalStorage) : init;
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

// @TODO Melhorar aqui depois

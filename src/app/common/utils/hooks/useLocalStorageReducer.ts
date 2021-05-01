import * as React from 'react';

export const useLocalStorageReducer = <Data extends React.Reducer<any, any>>(
  key: string,
  reducer: Data,
  initialState: React.ReducerState<Data>,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = {},
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState, () => {
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

  return [state, dispatch] as const;
};

import { useEffect, useCallback, useRef } from 'react';

const useInterval = (fn: () => void, milliseconds: number): void => {
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  // the clear method
  const clear = useCallback(() => {
    if (timeout.current) {
      clearInterval(timeout.current);
    }
  }, []);

  // if the provided function changes, change its reference
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // when the milliseconds change, reset the timeout
  useEffect(() => {
    timeout.current = setInterval(() => {
      callback.current();
    }, milliseconds);
  }, [milliseconds]);

  // when component unmount clear the timeout
  useEffect(
    () => (): void => {
      clear();
    },
    [],
  );
};

export default useInterval;

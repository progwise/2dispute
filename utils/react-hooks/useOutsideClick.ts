import React, { useEffect } from 'react';

// see https://stackoverflow.com/a/42234988

const useOutSideClick = (
  ref: React.RefObject<HTMLElement>,
  callbackFunction: () => void,
  deps: React.DependencyList = [],
): void => {
  useEffect(() => {
    const handleClickOutside = (event): void => {
      if (!ref.current?.contains(event.target)) {
        callbackFunction();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, ...deps]);
};

export default useOutSideClick;

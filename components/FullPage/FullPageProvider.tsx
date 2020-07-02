import React, { ReactNode, useState } from 'react';
import FullPageContext from './FullPageContext';

interface FullPageProviderProps {
  children: ReactNode;
}

const FullPageProvider = ({ children }: FullPageProviderProps): JSX.Element => {
  const [fullPage, setFullPage] = useState(false);

  return (
    <FullPageContext.Provider value={{ fullPage, setFullPage }}>
      {children}
    </FullPageContext.Provider>
  );
};

export default FullPageProvider;

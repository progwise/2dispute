import { createContext } from 'react';

interface FullPageContextInterface {
  fullPage: boolean;
  setFullPage: (newValue: boolean) => void;
}

const FullPageContext = createContext<FullPageContextInterface>({
  fullPage: false,
  setFullPage: () => undefined,
});

export default FullPageContext;

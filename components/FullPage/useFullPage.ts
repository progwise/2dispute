import { useEffect, useContext } from 'react';
import FullPageContext from './FullPageContext';

const useFullPage = (): void => {
  const fullPageContext = useContext(FullPageContext);

  useEffect(() => {
    fullPageContext.setFullPage(true);

    return (): void => fullPageContext.setFullPage(false);
  }, []);
};

export default useFullPage;

import React, { useContext } from 'react';
import UserContext from '../components/contexts/UserContext';

const Home = (): JSX.Element => {
  const userContext = useContext(UserContext);
  const name = userContext.user?.nickname ?? 'World';

  return <p>Hello {name}</p>;
};

export default Home;

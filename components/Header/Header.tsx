import React from 'react';
import { useHeaderMeQuery } from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';

const Header = (): JSX.Element => {
  const { loading, data } = useHeaderMeQuery();

  let userName: string;

  if (data?.me) {
    userName = data.me.name;
  } else if (loading) {
    userName = 'loading...';
  } else {
    userName = 'unangemeldet';
  }

  return (
    <header className="w-full py-4 flex flex-col items-center">
      <span className="text-2xl">2 Dispute</span>
      <span>Benutzer: {userName}</span>
    </header>
  );
};

export default withApollo(Header);

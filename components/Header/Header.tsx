import React from 'react';
import { useRouter } from 'next/router';
import { useHeaderMeQuery } from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import Link from '../Link/Link';

const Header = (): JSX.Element => {
  const { loading, data } = useHeaderMeQuery();
  const router = useRouter();

  let userName: string;
  let authLink: JSX.Element | undefined = undefined;

  if (data?.me) {
    userName = data.me.name;
    authLink = <Link href="/api/logout">abmelden</Link>;
  } else if (loading) {
    userName = 'loading...';
  } else {
    userName = 'unangemeldet';
    authLink = (
      <Link href={`/api/login?redirectTo=${router.asPath}`}>anmelden</Link>
    );
  }

  return (
    <header className="w-full py-4 flex flex-col items-center">
      <span className="text-2xl">2 Dispute</span>
      <span>
        Benutzer: {userName} {authLink && <>({authLink})</>}
      </span>
    </header>
  );
};

export default withApollo(Header);

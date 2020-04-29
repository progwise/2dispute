import React from 'react';
import { useRouter } from 'next/router';
import { useHeaderMeQuery } from '../../graphql/generated/graphql';
import withApollo from '../../utils/withApollo';
import NavBar, { NavBarItem } from './NavBar';
import Logo from './Logo';

const Header = (): JSX.Element => {
  const { data } = useHeaderMeQuery();
  const router = useRouter();

  const isAuthenticated = data?.me ? true : false;

  const loginPath = `/api/login?redirectTo=${router.asPath}`;
  const logoutPath = '/api/logout';

  return (
    <header className="pb-8">
      <NavBar>
        {isAuthenticated ? (
          <>
            <NavBarItem href="/me" as="me">
              Mein Profil
            </NavBarItem>
            <NavBarItem href={logoutPath}>Abmelden</NavBarItem>
          </>
        ) : (
          <>
            <NavBarItem href={loginPath}>Anmelden</NavBarItem>
            <NavBarItem href={loginPath}>Registrieren</NavBarItem>
          </>
        )}
      </NavBar>
      <Logo />
    </header>
  );
};

export default withApollo(Header);

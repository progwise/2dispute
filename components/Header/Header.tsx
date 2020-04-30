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

  const getLoginPath = (redirectTo: string = router.asPath): string =>
    `/api/login?redirectTo=${redirectTo}`;
  const logoutPath = '/api/logout';
  const createSubjectPath = '/subjects/create';

  return (
    <header className="pb-8">
      <NavBar>
        <NavBarItem
          href={
            isAuthenticated
              ? createSubjectPath
              : getLoginPath(createSubjectPath)
          }
        >
          Neues Thema erstellen
        </NavBarItem>
        {isAuthenticated ? (
          <>
            <NavBarItem href="/me" as="/me">
              Mein Profil
            </NavBarItem>
            <NavBarItem href={logoutPath}>Abmelden</NavBarItem>
          </>
        ) : (
          <>
            <NavBarItem href={getLoginPath()}>Anmelden</NavBarItem>
            <NavBarItem href={getLoginPath()}>Registrieren</NavBarItem>
          </>
        )}
      </NavBar>
      <Logo />
    </header>
  );
};

export default withApollo(Header);

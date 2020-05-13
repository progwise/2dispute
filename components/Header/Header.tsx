import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Waypoint } from 'react-waypoint';
import { useHeaderMeQuery } from '../../graphql/generated/frontend';
import withApollo from '../../utils/withApollo';
import NavBar, { NavBarItem } from './NavBar';
import Logo from './Logo';
import Notifications from './Notifcations';

const Header = (): JSX.Element => {
  const [logoVisible, setLogoVisible] = useState(true);
  const { data } = useHeaderMeQuery();
  const router = useRouter();

  const isAuthenticated = data?.me ? true : false;

  const getLoginPath = (redirectTo: string = router.asPath): string =>
    `/api/auth/twitter?redirectTo=${redirectTo}`;
  const logoutPath = '/api/auth/logout';
  const createSubjectPath = '/subjects/create';

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} hideLogo={logoVisible}>
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
            <li className="hidden md:block">
              <Notifications />
            </li>
          </>
        ) : (
          <>
            <NavBarItem href={getLoginPath()}>Mit Twitter Anmelden</NavBarItem>
          </>
        )}
      </NavBar>
      <Waypoint
        onEnter={(): void => setLogoVisible(true)}
        onLeave={(): void => setLogoVisible(false)}
        topOffset={66}
      >
        <div>
          <Logo className="pb-8" />
        </div>
      </Waypoint>
    </>
  );
};

export default withApollo(Header);

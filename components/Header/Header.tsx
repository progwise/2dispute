import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Waypoint } from 'react-waypoint';
import { useHeaderMeQuery } from '../../graphql/generated/frontend';
import withApollo from '../../utils/withApollo';
import { FullPageContext } from '../FullPage';
import NavBar, { NavBarItem } from './NavBar';
import Logo from './Logo';
import Notifications from './Notifcations';

const Header = (): JSX.Element => {
  const [logoVisible, setLogoVisible] = useState(true);
  const { data } = useHeaderMeQuery();
  const router = useRouter();
  const isFullPage = useContext(FullPageContext).fullPage;

  const isAuthenticated = data?.me ? true : false;

  const getLoginPath = (redirectTo: string = router.asPath): string =>
    `/api/auth/twitter?redirectTo=${redirectTo}`;
  const logoutPath = '/api/auth/logout';
  const createSubjectPath = '/new';

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        showLogo={isFullPage || !logoVisible}
      >
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
            <NavBarItem href="/">Chat</NavBarItem>
            <NavBarItem href="/me">Mein Profil</NavBarItem>
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
      {!isFullPage && (
        <Waypoint
          onEnter={(): void => setLogoVisible(true)}
          onLeave={(): void => setLogoVisible(false)}
          topOffset={66}
        >
          <div>
            <Logo className="pb-8" />
          </div>
        </Waypoint>
      )}
    </>
  );
};

export default withApollo(Header);

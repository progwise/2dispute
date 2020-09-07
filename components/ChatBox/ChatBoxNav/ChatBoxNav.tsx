import React from 'react';
import { useRouter } from 'next/router';
import { FaComments, FaSignInAlt, FaUser } from 'react-icons/fa';
import useUser from '../../../utils/react-hooks/useUser';
import i18n from '../../../utils/i18n';
import ChatBoxNavItem from './ChatBoxNavItem';

const ChatBoxNav = (): JSX.Element => {
  const user = useUser();
  const router = useRouter();
  const { t } = i18n.useTranslation();
  const isAuthenticated = user !== null;

  return (
    <div className="flex flex-wrap py-2 text-gray-700 font-light">
      <ChatBoxNavItem
        href="/"
        icon={FaComments}
        text={t('navbar.chat')}
        isActive={['/', '/[chatItemId]'].includes(router.pathname)}
      />
      <ChatBoxNavItem
        href="/me"
        icon={FaUser}
        text={t('navbar.profile')}
        isActive={router.pathname === '/me'}
      />
      {isAuthenticated ? (
        <ChatBoxNavItem
          href="/api/auth/logout"
          icon={FaSignInAlt}
          text={t('navbar.signOut')}
        />
      ) : (
        <ChatBoxNavItem
          href={{
            pathname: '/api/auth/twitter',
            query: { redirectTo: router.asPath },
          }}
          icon={FaSignInAlt}
          text={t('navbar.signIn')}
        />
      )}
    </div>
  );
};

export default ChatBoxNav;

import React from 'react';
import { FaComments, FaSignInAlt, FaUser } from 'react-icons/fa';
import useUser from '../../../utils/react-hooks/useUser';
import ChatBoxNavItem from './ChatBoxNavItem';

const ChatBoxNav = (): JSX.Element => {
  const user = useUser();
  const isAuthenticated = user !== null;

  return (
    <div className="flex flex-wrap py-2 text-gray-800 font-light">
      <ChatBoxNavItem href={{ pathname: '/' }} icon={FaComments} text="Chat" />
      <ChatBoxNavItem href={{ pathname: '/me' }} icon={FaUser} text="Profil" />
      {isAuthenticated ? (
        <ChatBoxNavItem
          href={{ pathname: '/api/auth/logout' }}
          icon={FaSignInAlt}
          text="Abmelden"
        />
      ) : (
        <ChatBoxNavItem
          href={{ pathname: '/api/auth/twitter' }}
          icon={FaSignInAlt}
          text="Anmelden"
        />
      )}
    </div>
  );
};

export default ChatBoxNav;

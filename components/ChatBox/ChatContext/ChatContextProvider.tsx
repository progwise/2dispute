import React, { useState } from 'react';
import { ChatScope } from '../../../graphql/generated/frontend';
import ChatContext from './ChatContext';

interface ChatContextProviderProps {
  children: React.ReactNode;
}

const ChatContextProvider = ({
  children,
}: ChatContextProviderProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const [chatScope, setChatScope] = useState(ChatScope.All);

  return (
    <ChatContext.Provider
      value={{ search, setSearch, scope: chatScope, setScope: setChatScope }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

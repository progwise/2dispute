import React, { useRef, useEffect, useContext } from 'react';
import { useFullPage } from '../FullPage';
import ChatList from './ChatList';
import ChatItemHeader from './ChatItemHeader';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';
import ChatItem from './ChatItem';
import ChatContext from './ChatContext';

interface ChatBoxProps {
  selectedChatItemId?: string;
}

const ChatBox = ({ selectedChatItemId }: ChatBoxProps): JSX.Element => {
  const { search, setSearch, scope, setScope } = useContext(ChatContext);
  useFullPage();

  // When search or scope change scroll in chat list to the top
  const scrollableChatList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableChatList.current?.scrollTo(0, 0);
  }, [scrollableChatList, search, scope]);

  const isDisputeSelected = selectedChatItemId !== undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <SearchAndCreateSubjectBox
        search={search}
        onSearchChange={setSearch}
        className={`border-b md:border-r ${
          isDisputeSelected && 'hidden'
        } md:block`}
        scope={scope}
        onScopeChange={setScope}
      />

      {selectedChatItemId !== undefined && (
        <ChatItemHeader
          chatItemId={selectedChatItemId}
          className="md:col-span-2 border-b px-4"
        />
      )}
      <div
        className={`row-start-2 md:border-r overflow-y-auto ${
          isDisputeSelected && 'hidden'
        } md:block`}
        ref={scrollableChatList}
      >
        <ChatList
          selectedChatItemId={selectedChatItemId}
          search={search}
          scope={scope}
        />
      </div>
      {selectedChatItemId && (
        <div className="md:col-span-2 overflow-y-auto px-4">
          <ChatItem chatItemId={selectedChatItemId} />
        </div>
      )}
    </div>
  );
};

export default ChatBox;

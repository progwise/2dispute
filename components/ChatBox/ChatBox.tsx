import React, { useRef, useEffect, useContext } from 'react';
import { useFullPage } from '../FullPage';
import CreateSubject from '../Subject/CreateSubject/CreateSubject';
import ChatList from './ChatList';
import ChatBoxHeader, { ChatItemHeader } from './ChatBoxHeader';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';
import ChatItem from './ChatItem';
import ChatContext from './ChatContext';

interface ChatBoxProps {
  selectedChatItemId?: string;
  showNewSubjectForm?: boolean;
}

const ChatBox = ({
  selectedChatItemId,
  showNewSubjectForm = false,
}: ChatBoxProps): JSX.Element => {
  const { search, setSearch, scope, setScope } = useContext(ChatContext);
  useFullPage();

  // When search or scope change scroll in chat list to the top
  const scrollableChatList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableChatList.current?.scrollTo(0, 0);
  }, [scrollableChatList, search, scope]);

  const showRightSide = selectedChatItemId !== undefined || showNewSubjectForm;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <SearchAndCreateSubjectBox
        search={search}
        onSearchChange={setSearch}
        className={`border-b md:border-r ${showRightSide && 'hidden'} md:block`}
        scope={scope}
        onScopeChange={setScope}
      />

      {selectedChatItemId !== undefined ? (
        <ChatItemHeader chatItemId={selectedChatItemId} />
      ) : (
        showNewSubjectForm && <ChatBoxHeader header="Neues Thema" />
      )}

      <div
        className={`row-start-2 md:border-r overflow-y-auto ${
          showRightSide && 'hidden'
        } md:block`}
        ref={scrollableChatList}
      >
        <ChatList
          selectedChatItemId={selectedChatItemId}
          search={search}
          scope={scope}
        />
      </div>
      {showRightSide && (
        <div className="md:col-span-2 overflow-y-auto px-4">
          {showNewSubjectForm ? (
            <CreateSubject />
          ) : (
            selectedChatItemId && <ChatItem chatItemId={selectedChatItemId} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;

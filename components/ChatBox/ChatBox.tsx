import React, { useState } from 'react';
import { useFullPage } from '../FullPage';
import ChatList from './ChatList';
import ChatItemHeader from './ChatItemHeader';
import SearchAndCreateSubjectBox from './SearchAndCreateSubjectBox';
import ChatItem from './ChatItem';

interface ChatBoxProps {
  selectedChatItemId?: string;
}

const ChatBox = ({ selectedChatItemId }: ChatBoxProps): JSX.Element => {
  const [search, setSearch] = useState('');
  useFullPage();

  const isDisputeSelected = selectedChatItemId !== undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-chatBox h-full text-gray-900">
      <SearchAndCreateSubjectBox
        onSearchChange={setSearch}
        className={`border-b md:border-r ${
          isDisputeSelected && 'hidden'
        } md:flex`}
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
      >
        <ChatList selectedChatItemId={selectedChatItemId} search={search} />
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

import React from 'react';
import Link from 'next/link';
import { ChatListItemFragment } from '../../../../graphql/generated/frontend';
import ChatListItemUser from './ChatListItemUser';
import DateTimeDistance from './DateTimeDistance';

interface ChatListItemProps {
  chatItem: ChatListItemFragment;
  isSelected: boolean;
}

const ChatListItem = ({
  chatItem,
  isSelected,
}: ChatListItemProps): JSX.Element => {
  if (chatItem.__typename !== 'Dispute') {
    return <li>Chat Item type not implemented yet</li>;
  }

  return (
    <li className="border-b">
      <Link href="/chat/[chatItemId]" as={`/chat/${chatItem.id}`}>
        <a
          className={`p-3 cursor-pointer block space-y-1 ${
            isSelected ? 'bg-blue-700 text-gray-100' : 'hover:bg-gray-300'
          }`}
        >
          <div className="flex items-end space-x-1">
            <div
              className="truncate flex-grow"
              title={chatItem.subject.subject}
            >
              {chatItem.subject.subject}
            </div>
            <DateTimeDistance
              dateTime={chatItem.lastUpdateAt}
              className="text-xs font-light whitespace-no-wrap"
            />
          </div>
          <ChatListItemUser user={chatItem.partnerA} isSelected={isSelected} />
          <ChatListItemUser user={chatItem.partnerB} isSelected={isSelected} />
        </a>
      </Link>
    </li>
  );
};

export default ChatListItem;

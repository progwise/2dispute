import React from 'react';
import Link from 'next/link';
import { ChatListItemFragment } from '../../../../graphql/generated/frontend';
import ChatListItemUser from './ChatListItemUser';
import DateTimeDistance from './DateTimeDistance';

interface ChatListItemProps {
  dispute: ChatListItemFragment;
  isSelected: boolean;
}

const ChatListItem = ({
  dispute,
  isSelected,
}: ChatListItemProps): JSX.Element => (
  <li className="border-b">
    <Link href="/chat/[disputeId]" as={`/chat/${dispute.id}`}>
      <a
        className={`p-3 cursor-pointer block space-y-1 ${
          isSelected ? 'bg-blue-700 text-gray-100' : 'hover:bg-gray-300'
        }`}
      >
        <div className="flex items-end space-x-1">
          <div className="truncate flex-grow" title={dispute.subject.subject}>
            {dispute.subject.subject}
          </div>
          <DateTimeDistance
            dateTime={dispute.lastMessageAt}
            className="text-xs font-light whitespace-no-wrap"
          />
        </div>
        <ChatListItemUser user={dispute.partnerA} isSelected={isSelected} />
        <ChatListItemUser user={dispute.partnerB} isSelected={isSelected} />
      </a>
    </Link>
  </li>
);

export default ChatListItem;

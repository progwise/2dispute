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
  <li className="odd:bg-gray-200">
    <Link href="/chat/[disputeId]" as={`/chat/${dispute.id}`}>
      <a
        className={`p-3 hover:bg-gray-400 cursor-pointer block space-y-1 ${
          isSelected && 'bg-gray-400'
        }`}
      >
        <div className="flex items-end">
          <div className="truncate flex-grow" title={dispute.subject.subject}>
            {dispute.subject.subject}
          </div>
          <DateTimeDistance
            dateTime={dispute.lastMessageAt}
            className="text-xs font-light whitespace-no-wrap"
          />
        </div>
        <ChatListItemUser user={dispute.partnerA} />
        <ChatListItemUser user={dispute.partnerB} />
      </a>
    </Link>
  </li>
);

export default ChatListItem;

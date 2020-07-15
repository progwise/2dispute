import React from 'react';
import Link from 'next/link';

interface ChatListItemContainerProps {
  chatItemId: string;
  isSelected?: boolean;
  children: React.ReactNode;
}

const ChatListItemContainer = ({
  chatItemId,
  isSelected = false,
  children,
}: ChatListItemContainerProps): JSX.Element => (
  <li className="border-b">
    <Link href="/chat/[chatItemId]" as={`/chat/${chatItemId}`}>
      <a
        className={`p-3 cursor-pointer block space-y-1 ${
          isSelected ? 'bg-blue-700 text-gray-100' : 'hover:bg-gray-300'
        }`}
      >
        {children}
      </a>
    </Link>
  </li>
);

export default ChatListItemContainer;

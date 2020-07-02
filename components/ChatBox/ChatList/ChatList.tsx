import React from 'react';
import { useChatListQuery } from '../../../graphql/generated/frontend';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  selectedDisputeId?: string;
}

const ChatList = ({ selectedDisputeId }: ChatListProps): JSX.Element => {
  const { data, loading, error } = useChatListQuery();

  if (loading) {
    return <p>Loading</p>;
  }

  if (error || !data?.chat) {
    return <p>Chat Partner konnten nicht geladen werden</p>;
  }

  return (
    <ul>
      {data.chat.items
        .sort((disputeA, disputeB) =>
          disputeB.lastMessageAt.localeCompare(disputeA.lastMessageAt),
        )
        .map(dispute => (
          <ChatListItem
            key={dispute.id}
            dispute={dispute}
            isSelected={dispute.id === selectedDisputeId}
          />
        ))}
    </ul>
  );
};

export default ChatList;

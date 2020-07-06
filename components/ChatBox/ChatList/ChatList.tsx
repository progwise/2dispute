import React from 'react';
import { useChatListQuery } from '../../../graphql/generated/frontend';
import useInterval from '../../../utils/react-hooks/useInterval';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  selectedDisputeId?: string;
}

const ChatList = ({ selectedDisputeId }: ChatListProps): JSX.Element => {
  const { data, loading, error, fetchMore } = useChatListQuery();

  const fetchNewerDisputes = async (): Promise<void> => {
    if (!data?.chat) {
      return;
    }

    await fetchMore({
      variables: { before: data?.chat?.newestLastMessageAt },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!prevResult.chat) {
          return {
            ...prevResult,
            chat: fetchMoreResult?.chat,
          };
        }

        if (!fetchMoreResult?.chat) {
          return prevResult;
        }

        const newItems = [
          ...fetchMoreResult.chat.items,
          ...prevResult.chat.items,
        ].filter(
          (item, index, array) =>
            // If multiple items have the same id, keep only the first occurrence:
            index === array.findIndex(i => i.id === item.id),
        );

        return {
          ...prevResult,
          chat: {
            ...prevResult.chat,
            newestLastMessageAt:
              fetchMoreResult.chat.newestLastMessageAt ??
              prevResult.chat.newestLastMessageAt,
            items: newItems,
          },
        };
      },
    });
  };

  useInterval(() => fetchNewerDisputes(), 30 * 1000);

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

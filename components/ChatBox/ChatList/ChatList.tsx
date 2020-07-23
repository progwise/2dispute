import React from 'react';
import { Waypoint } from 'react-waypoint';
import {
  useChatListQuery,
  ChatScope,
} from '../../../graphql/generated/frontend';
import useInterval from '../../../utils/react-hooks/useInterval';
import ChatListItem from './ChatListItem';
import Loader from './Loader';

interface ChatListProps {
  selectedChatItemId?: string;
  search: string;
  scope: ChatScope;
}

const ChatList = ({
  selectedChatItemId,
  search,
  scope,
}: ChatListProps): JSX.Element => {
  const { data, loading, error, fetchMore } = useChatListQuery({
    variables: { search, scope },
  });

  const fetchNewerDisputes = async (): Promise<void> => {
    if (!data?.chat) {
      return;
    }
    await fetchMore({ variables: { before: data.chat.pageInfo.startCursor } });
  };

  const handleFetchMore = async (): Promise<void> => {
    if (!data?.chat) {
      return;
    }
    await fetchMore({ variables: { after: data.chat.pageInfo.endCursor } });
  };

  useInterval(() => fetchNewerDisputes(), 30 * 1000);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !data?.chat) {
    return <p>Chat Partner konnten nicht geladen werden</p>;
  }

  return (
    <ul>
      {data.chat.edges
        .map(edge => edge.node)
        .sort((chatItemA, chatItemB) =>
          chatItemB.lastUpdateAt.localeCompare(chatItemA.lastUpdateAt),
        )
        .map(chatItem => (
          <ChatListItem
            key={chatItem.id}
            chatItem={chatItem}
            isSelected={chatItem.id === selectedChatItemId}
          />
        ))}
      {data.chat.pageInfo.hasNextPage && !loading && (
        <Waypoint
          key={data.chat.pageInfo.endCursor ?? ''}
          onEnter={handleFetchMore}
          bottomOffset="-100px"
        />
      )}
    </ul>
  );
};

export default ChatList;

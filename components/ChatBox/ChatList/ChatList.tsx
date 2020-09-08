import React from 'react';
import { Waypoint } from 'react-waypoint';
import {
  useChatListQuery,
  ChatScope,
  ChatListItemFragment,
} from '../../../graphql/generated/frontend';
import useInterval from '../../../utils/react-hooks/useInterval';
import { useSelectedChatItem } from '../../../utils/react-hooks/useSelectChatItem';
import constants from '../../../utils/constants';
import { useTranslation } from '../../../utils/i18n';
import ChatListItem from './ChatListItem';
import Loader from './Loader';

interface ChatListProps {
  search: string;
  scope: ChatScope;
}

const ChatList = ({ search, scope }: ChatListProps): JSX.Element => {
  const { t } = useTranslation();
  const { data, loading, error, fetchMore } = useChatListQuery({
    variables: { search, scope },
  });
  const selectedChatItemId = useSelectedChatItem();

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

  useInterval(() => fetchNewerDisputes(), constants.DEFAULT_POLL_INTERVAL);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !data?.chat) {
    return <p>{t('chat.errorLoadingChatItems')}</p>;
  }

  const reduceDuplicates = (
    accumulator: ChatListItemFragment[],
    currentItem: ChatListItemFragment,
  ): ChatListItemFragment[] => {
    const alreadyAdded = accumulator.some(item => item.id === currentItem.id);
    if (alreadyAdded) {
      return accumulator;
    }
    return [...accumulator, currentItem];
  };

  return (
    <ul className="divide-y">
      {data.chat.edges
        .map(edge => edge.node)
        .reduce(reduceDuplicates, [])
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

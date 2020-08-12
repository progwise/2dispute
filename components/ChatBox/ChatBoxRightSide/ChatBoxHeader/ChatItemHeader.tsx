import React from 'react';
import { useChatItemHeaderQuery } from '../../../../graphql/generated/frontend';
import ChatBoxHeader from './ChatBoxHeader';

interface ChatItemHeaderProps {
  chatItemId: string;
  displayOnSmallDevices: boolean;
}

const ChatItemHeader = ({
  chatItemId,
  displayOnSmallDevices,
}: ChatItemHeaderProps): JSX.Element => {
  const { data } = useChatItemHeaderQuery({
    variables: { chatItemId },
    fetchPolicy: 'cache-only',
  });

  const chatItem = data?.chatItem;

  const subject =
    chatItem?.__typename === 'Dispute'
      ? chatItem.subject.subject
      : chatItem?.__typename === 'Subject'
      ? chatItem.topic
      : undefined;

  return (
    <ChatBoxHeader
      header={subject || ''}
      displayOnSmallDevices={displayOnSmallDevices}
    />
  );
};

export default ChatItemHeader;

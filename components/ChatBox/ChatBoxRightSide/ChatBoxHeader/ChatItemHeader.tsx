import React from 'react';
import { useChatItemHeaderQuery } from '../../../../graphql/generated/frontend';
import ChatBoxHeader from './ChatBoxHeader';
import DisputeDropdown from './DisputeDropdown';

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
    pollInterval: 60 * 1000,
  });

  const chatItem = data?.chatItem;

  const subject =
    chatItem?.__typename === 'Dispute'
      ? chatItem.subject
      : chatItem?.__typename === 'Subject'
      ? chatItem
      : undefined;

  return (
    <ChatBoxHeader displayOnSmallDevices={displayOnSmallDevices}>
      <div className="flex items-center">
        <div className="flex-grow truncate" title={subject?.topic}>
          {subject?.topic}
        </div>
        {subject ? (
          <DisputeDropdown subject={subject} selectedChatItem={chatItemId} />
        ) : null}
      </div>
    </ChatBoxHeader>
  );
};

export default ChatItemHeader;

import React from 'react';
import { ChatListItemFragment } from '../../../../graphql/generated/frontend';
import ChatListItemUser from './ChatListItemUser';
import ChatListItemHeader from './ChatListItemHeader';
import ChatListItemContainer from './ChatListItemContainer';

interface ChatListItemProps {
  chatItem: ChatListItemFragment;
  isSelected: boolean;
}

const ChatListItem = ({
  chatItem,
  isSelected,
}: ChatListItemProps): JSX.Element => {
  switch (chatItem.__typename) {
    case 'Dispute':
      return (
        <ChatListItemContainer chatItemId={chatItem.id} isSelected={isSelected}>
          <ChatListItemHeader
            title={chatItem.subject.subject}
            dateTime={chatItem.lastUpdateAt}
          />
          <ChatListItemUser user={chatItem.partnerA} isSelected={isSelected} />
          <ChatListItemUser user={chatItem.partnerB} isSelected={isSelected} />
        </ChatListItemContainer>
      );
    case 'Subject':
      return (
        <ChatListItemContainer chatItemId={chatItem.id} isSelected={isSelected}>
          <ChatListItemHeader
            title={chatItem.subjectTitle}
            dateTime={chatItem.lastUpdateAt}
          />
          <ChatListItemUser user={chatItem.author} isSelected={isSelected} />
        </ChatListItemContainer>
      );
    default:
      throw new Error('Chat item type not implemented yet');
  }
};

export default ChatListItem;

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChatItemHeader } from '../components/ChatBox/ChatBoxRightSide/ChatBoxHeader';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';
import ChatItem from '../components/ChatBox/ChatBoxRightSide/ChatItem';
import { useSetSelectedChatItem } from '../utils/react-hooks/useSelectChatItem';

const ChatItemApp = (): JSX.Element | null => {
  const router = useRouter();
  const setSelectedChatItem = useSetSelectedChatItem();

  const chatItemId = Array.isArray(router.query.chatItemId)
    ? router.query.chatItemId[0]
    : router.query.chatItemId;

  useEffect(() => {
    setSelectedChatItem(chatItemId);
    return (): void => setSelectedChatItem(undefined);
  }, [setSelectedChatItem, chatItemId]);

  if (!chatItemId) {
    return null;
  }

  return (
    <>
      <ChatItemHeader chatItemId={chatItemId} />
      <ChatBoxRightSideContent>
        <ChatItem chatItemId={chatItemId} />
      </ChatBoxRightSideContent>
    </>
  );
};

ChatItemApp.getInitialProps = (): { [prop: string]: unknown } => ({
  namespacesRequired: ['common'],
});

export default ChatItemApp;

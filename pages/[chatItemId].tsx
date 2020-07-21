import React from 'react';
import { useRouter } from 'next/router';
import ChatBox from '../components/ChatBox';
import withApollo from '../utils/withApollo';

const ChatWithOpenDispute = (): JSX.Element => {
  const router = useRouter();
  const chatItemId = Array.isArray(router.query.chatItemId)
    ? router.query.chatItemId[0]
    : router.query.chatItemId;

  return <ChatBox selectedChatItemId={chatItemId} />;
};

export default withApollo(ChatWithOpenDispute);

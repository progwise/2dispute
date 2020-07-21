import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../utils/withApollo';
import ChatBox from '../components/ChatBox';

const Chat = (): JSX.Element => {
  const router = useRouter();

  if ('new' in router.query) {
    return <ChatBox showNewSubjectForm />;
  }

  const chatId = router.query.chatId as string | undefined;
  return <ChatBox selectedChatItemId={chatId} />;
};

export default withApollo(Chat);

import React from 'react';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';
import ChatBoxRightSideEmpty from '../components/ChatBox/ChatBoxRightSide/ChatBoxRightSideEmpty';
import { setDisplayChatListOnSmallDevices } from '../utils/react-hooks/useDisplayChatListOnSmallDevices';

const Chat = (): JSX.Element => {
  setDisplayChatListOnSmallDevices();
  return (
    <ChatBoxRightSideContent>
      <ChatBoxRightSideEmpty />
    </ChatBoxRightSideContent>
  );
};

Chat.getInitialProps = (): { [prop: string]: unknown } => ({
  namespacesRequired: ['common'],
});

export default Chat;

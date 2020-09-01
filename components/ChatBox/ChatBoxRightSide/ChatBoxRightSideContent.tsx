import React, { ReactNode } from 'react';
import useDisplayChatListOnSmallDevices from '../../../utils/react-hooks/useDisplayChatListOnSmallDevices';

interface ChatBoxRightSideContentProps {
  children: ReactNode;
}

const ChatBoxRightSideContent = ({
  children,
}: ChatBoxRightSideContentProps): JSX.Element => {
  const displayChatListOnSmallDevices = useDisplayChatListOnSmallDevices();
  return (
    <div
      className={`row-start-2 col-start-1 md:col-start-2 md:col-span-2 overflow-y-auto p-4 ${
        displayChatListOnSmallDevices ? 'hidden' : ''
      } md:block z-10`}
    >
      {children}
    </div>
  );
};

export default ChatBoxRightSideContent;

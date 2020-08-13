import React, { ReactNode } from 'react';

interface ChatBoxRightSideContentProps {
  children: ReactNode;
  displayOnSmallDevices: boolean;
}

const ChatBoxRightSideContent = ({
  children,
  displayOnSmallDevices,
}: ChatBoxRightSideContentProps): JSX.Element => (
  <div
    className={`row-start-2 col-start-1 md:col-start-2 md:col-span-2 row-span-2 overflow-y-auto p-4 ${
      displayOnSmallDevices ? '' : 'hidden'
    } md:block`}
  >
    {children}
  </div>
);

export default ChatBoxRightSideContent;

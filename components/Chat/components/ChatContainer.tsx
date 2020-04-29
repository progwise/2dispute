import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps): JSX.Element => (
  <div className="grid grid-cols-1 md:grid-cols-chat items-start gap-4 md:row-gap-0">
    {children}
    <div className="hidden md:block col-start-2 row-start-1 row-end-last self-stretch border-r-2 mt-16" />
  </div>
);

export default ChatContainer;

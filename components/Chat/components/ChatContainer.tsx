import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps): JSX.Element => (
  <div className="grid grid-cols-chat items-start">
    {children}
    <div className="col-start-2 row-start-1 row-end-last self-stretch border-r-2" />
  </div>
);

export default ChatContainer;

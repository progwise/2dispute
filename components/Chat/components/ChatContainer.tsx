import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps): JSX.Element => (
  <div className="grid grid-cols-4">{children}</div>
);

export default ChatContainer;

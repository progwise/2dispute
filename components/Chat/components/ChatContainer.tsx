import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps): JSX.Element => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 row-gap-10">
    {children}
  </div>
);

export default ChatContainer;

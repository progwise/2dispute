import React from 'react';

interface ChatItemFullWidthProps {
  children: React.ReactNode;
  className?: string;
}

const ChatItemFullWidth = ({
  children,
  className,
}: ChatItemFullWidthProps): JSX.Element => (
  <div className={`col-start-1 md:col-span-3 ${className}`}>{children}</div>
);

export default ChatItemFullWidth;

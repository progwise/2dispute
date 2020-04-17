import React from 'react';

interface ChatMessageProps {
  text: string;
  position: 'left' | 'right';
}

const ChatMessage = ({ text, position }: ChatMessageProps): JSX.Element => (
  <div
    className={`${
      position === 'left' ? 'col-start-1' : 'col-start-2'
    } col-span-3 border-2`}
  >
    {text}
  </div>
);

export default ChatMessage;

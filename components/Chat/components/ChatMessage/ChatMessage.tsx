import React from 'react';
import { ChatMessageFragment } from '../../../../graphql/generated/frontend';
import DateTime from './DateTime';
import ChatBubble from './ChatBubble';
import ChatMessageFormatter from './ChatMessageFormatter/ChatMessageFormatter';

interface ChatMessageProps {
  message: ChatMessageFragment | ChatMessageFragment[];
  position: 'left' | 'right';
}

const ChatMessage = ({
  message,
  position,
}: ChatMessageProps): JSX.Element | null => {
  const messages = Array.isArray(message) ? message : [message];

  if (messages.length === 0) return null;

  const firstMessage = messages[0];

  return (
    <ChatBubble author={firstMessage.author} position={position}>
      {messages.map(message => (
        <div key={message.id}>
          <ChatMessageFormatter text={message.text} />
          <p>
            <DateTime dateTime={message.createdAt} />
          </p>
        </div>
      ))}
    </ChatBubble>
  );
};

export default ChatMessage;

import React from 'react';
import { ChatMessageFragment } from '../../../../graphql/generated/frontend';
import DateTime from './DateTime';
import ChatBubble from './ChatBubble';
import ChatMessageFormatter from './ChatMessageFormatter/ChatMessageFormatter';
import Votes from './Votes';

interface ChatMessageProps {
  message: ChatMessageFragment | ChatMessageFragment[];
  position: 'left' | 'right';
  isAuthenticated: boolean;
  showVotes?: boolean;
}

const ChatMessage = ({
  message,
  position,
  isAuthenticated,
  showVotes = false,
}: ChatMessageProps): JSX.Element | null => {
  const messages = Array.isArray(message) ? message : [message];

  if (messages.length === 0) return null;

  const firstMessage = messages[0];

  return (
    <ChatBubble author={firstMessage.author} position={position}>
      {messages.map(message => (
        <div key={message.id}>
          <ChatMessageFormatter text={message.text} />
          <p className="mt-1">
            <DateTime dateTime={message.createdAt} />
          </p>
          {showVotes && (
            <Votes
              votes={message.votes}
              messageId={message.id}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>
      ))}
    </ChatBubble>
  );
};

export default ChatMessage;

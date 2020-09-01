import React, { useState } from 'react';
import { ChatMessageFragment } from '../../../../graphql/generated/frontend';
import useUser from '../../../../utils/react-hooks/useUser';
import DateTime from './DateTime';
import ChatBubble from './ChatBubble';
import ChatMessageFormatter from './ChatMessageFormatter';
import Votes from './Votes';
import ChatMessageEdit from './ChatMessageEdit';

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
  const [selectedMessageId, setSelectedMessageId] = useState<
    string | undefined
  >(undefined);
  const user = useUser();
  const messages = Array.isArray(message) ? message : [message];

  if (messages.length === 0) return null;

  const closeMessageEdit = (): void => setSelectedMessageId(undefined);

  const firstMessage = messages[0];

  return (
    <ChatBubble author={firstMessage.author} position={position}>
      {messages.map(message => (
        <div key={message.id}>
          {selectedMessageId === message.id ? (
            <ChatMessageEdit
              id={message.id}
              text={message.text}
              onCancel={closeMessageEdit}
              onUpdate={closeMessageEdit}
            />
          ) : (
            <>
              <ChatMessageFormatter text={message.text} />
              {user?.twitterId === message.author.id ? (
                <p
                  className="text-xs text-gray-700 cursor-pointer"
                  onClick={(): void => setSelectedMessageId(message.id)}
                >
                  bearbeiten
                </p>
              ) : null}
            </>
          )}
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

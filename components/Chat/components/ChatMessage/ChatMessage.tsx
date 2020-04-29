import React from 'react';
import { ChatMessageFragment } from '../../../../graphql/generated/graphql';
import Arrow from './Arrow';
import TextboxWithAuthorPicture from './TextboxWithAuthorPicture';
import DateTime from './DateTime';

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
    <div
      className={`${
        position === 'left'
          ? 'md:col-start-1 md:mb-24 sm:pr-12 md:pr-0 flex-row-reverse md:flex-row'
          : 'md:col-start-3 md:mt-24 sm:pl-12 md:pl-0 flex-row md:flex-row-reverse'
      } flex text-xl text-gray-800 font-text-message`}
    >
      <TextboxWithAuthorPicture
        authorPicture={firstMessage.author.picture ?? ''}
        authorId={firstMessage.author.id}
        position={position}
      >
        {messages.map(message => (
          <div key={message.id}>
            <p>{message.text}</p>
            <p>
              <DateTime dateTime={message.createdAt} />
            </p>
          </div>
        ))}
      </TextboxWithAuthorPicture>
      <Arrow position={position} />
    </div>
  );
};

export default ChatMessage;

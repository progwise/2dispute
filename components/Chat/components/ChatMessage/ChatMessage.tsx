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
          ? 'col-start-1 mb-24 pr-4'
          : 'col-start-3 mt-24 pl-4 flex-row-reverse'
      } flex text-xl text-gray-800 font-text-message`}
    >
      <TextboxWithAuthorPicture
        authorPicture={firstMessage.author.picture ?? ''}
        position={position}
      >
        {messages.map(message => (
          <div key={message.id} className="pt-8 first:pt-0">
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

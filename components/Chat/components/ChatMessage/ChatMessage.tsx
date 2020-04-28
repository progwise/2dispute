import React from 'react';
import { ChatMessageFragment } from '../../../../graphql/generated/graphql';
import Arrow from './Arrow';
import TextboxWithAuthorPicture from './TextboxWithAuthorPicture';

interface ChatMessageProps {
  message: ChatMessageFragment;
  position: 'left' | 'right';
}

const ChatMessage = ({ message, position }: ChatMessageProps): JSX.Element => (
  <div
    className={`${
      position === 'left'
        ? 'col-start-1 mb-24 pr-4'
        : 'col-start-3 mt-24 pl-4 flex-row-reverse'
    } flex text-xl text-gray-800 font-text-message`}
  >
    <TextboxWithAuthorPicture
      authorPicture={message.author.picture ?? ''}
      position={position}
      createdAt={message.createdAt}
    >
      {message.text}
    </TextboxWithAuthorPicture>
    <Arrow position={position} />
  </div>
);

export default ChatMessage;

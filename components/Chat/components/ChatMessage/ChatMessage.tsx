import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/graphql';
import Arrow from './Arrow';
import TextboxWithAuthorPicture from './TextboxWithAuthorPicture';

interface ChatMessageProps {
  text: string;
  position: 'left' | 'right';
  author: ChatPersonFragment;
  createdAt: string;
}

const ChatMessage = ({
  text,
  position,
  author,
  createdAt,
}: ChatMessageProps): JSX.Element => (
  <div
    className={`${
      position === 'left'
        ? 'col-start-1 mb-24 pr-4'
        : 'col-start-3 mt-24 pl-4 flex-row-reverse'
    } flex text-xl text-gray-800 font-text-message`}
  >
    <TextboxWithAuthorPicture
      authorPicture={author.picture ?? ''}
      position={position}
      createdAt={createdAt}
    >
      {text}
    </TextboxWithAuthorPicture>
    <Arrow position={position} />
  </div>
);

export default ChatMessage;

import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/graphql';
import Arrow from './Arrow';
import TextboxWithAuthorPicture from './TextboxWithAuthorPicture';

interface ChatMessageProps {
  text: string;
  position: 'left' | 'right';
  author: ChatPersonFragment;
}

const ChatMessage = ({
  text,
  position,
  author,
}: ChatMessageProps): JSX.Element => (
  <div
    className={`${
      position === 'left'
        ? 'col-start-1 mb-24 pr-4'
        : 'col-start-3 mt-24 pl-4 flex-row-reverse'
    } flex`}
  >
    <TextboxWithAuthorPicture
      authorPicture={author.picture ?? ''}
      position={position}
    >
      {text}
    </TextboxWithAuthorPicture>
    <Arrow position={position} />
  </div>
);

export default ChatMessage;

import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/graphql';
import TextboxWithAuthorPicture from './TextboxWithAuthorPicture';
import Arrow from './Arrow';

interface ChatBubbleProps {
  position: 'left' | 'right';
  author: ChatPersonFragment;
  children: React.ReactNode;
}

const ChatBubble = ({
  position,
  author,
  children,
}: ChatBubbleProps): JSX.Element => (
  <div
    className={`${
      position === 'left'
        ? 'md:col-start-1 md:mb-24 sm:pr-12 md:pr-0 flex-row-reverse md:flex-row'
        : 'md:col-start-3 md:mt-24 sm:pl-12 md:pl-0 flex-row md:flex-row-reverse'
    } flex text-xl text-gray-800 font-text-message`}
  >
    <TextboxWithAuthorPicture
      authorPicture={author.picture ?? ''}
      authorId={author.id}
      position={position}
    >
      {children}
    </TextboxWithAuthorPicture>
    <Arrow position={position} />
  </div>
);

export default ChatBubble;

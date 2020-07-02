import React from 'react';
import { ChatPersonFragment } from '../../../../graphql/generated/frontend';
import TextBox from './TextBox';
import Arrow from './Arrow';
import ChatBubbleAuthor from './ChatBubbleAuthor';

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
    className={
      position === 'left'
        ? 'md:col-start-1 md:mb-24 sm:px-12 md:px-0 md:pr-0'
        : 'md:col-start-2 md:mt-24 sm:px-12 md:px-0 md:pl-0'
    }
  >
    <ChatBubbleAuthor author={author} />
    <div
      className={`flex text-gray-800 font-text-message break-words ${
        position === 'left'
          ? 'flex-row-reverse md:flex-row'
          : 'flex-row md:flex-row-reverse'
      }`}
    >
      <TextBox position={position}>{children}</TextBox>
      <Arrow position={position} />
    </div>
  </div>
);

export default ChatBubble;

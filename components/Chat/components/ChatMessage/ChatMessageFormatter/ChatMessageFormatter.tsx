import React from 'react';
import ChatMessage, { ChatMessageText, ChatMessageTweet } from './ChatMessage';

interface ChatMessageFormatterProps {
  text: string;
}

const separateTweets = (paragraph: ChatMessageText): ChatMessage[] => {
  const tweetRegex = /(?:[\w.:/]+)?twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/gi;
  return paragraph.text.split(tweetRegex).map(
    (text, index): ChatMessage => {
      const isOdd = index % 2 === 0;
      return isOdd ? new ChatMessageText(text) : new ChatMessageTweet(text);
    },
  );
};

const ChatMessageFormatter = ({
  text,
}: ChatMessageFormatterProps): JSX.Element => {
  const chatMessage = new ChatMessageText(text);
  const paragraphs = separateTweets(chatMessage);

  return (
    <>
      {paragraphs
        .filter(paragraph => !paragraph.isEmpty())
        .map((paragraph, index) => (
          <React.Fragment key={index}>{paragraph.render()}</React.Fragment>
        ))}
    </>
  );
};

export default ChatMessageFormatter;

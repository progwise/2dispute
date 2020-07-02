import React from 'react';
import Link from 'next/link';
import { ChatPersonFragment } from '../../../../graphql/generated/frontend';

interface ChatBubbleAuthorProps {
  author: ChatPersonFragment;
}

const ChatBubbleAuthor = ({ author }: ChatBubbleAuthorProps): JSX.Element => (
  <Link href="/users/[userId]" as={`/users/${author.id}`}>
    <a className="flex space-x-2 no-underline cursor-pointer mb-2">
      <img src={author.picture ?? ''} className="rounded-full w-16 h-16" />
      <div className="self-center">
        <p className="text-xl font-bold">{author.name}</p>
        <p className="text-sm text-blue-600">@{author.twitterHandle}</p>
      </div>
    </a>
  </Link>
);

export default ChatBubbleAuthor;

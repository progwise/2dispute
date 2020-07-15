import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from '../Link/Link';
import { useChatItemHeaderQuery } from '../../graphql/generated/frontend';

interface ChatItemHeaderProps {
  chatItemId: string;
  className?: string;
}

const ChatItemHeader = ({
  chatItemId,
  className = '',
}: ChatItemHeaderProps): JSX.Element => {
  const { data } = useChatItemHeaderQuery({
    variables: { chatItemId },
    fetchPolicy: 'cache-only',
  });

  const chatItem = data?.chatItem;

  const subject =
    chatItem?.__typename === 'Dispute'
      ? chatItem.subject.subject
      : chatItem?.__typename === 'Subject'
      ? chatItem.topic
      : undefined;

  return (
    <div className={`${className} flex items-center py-2`}>
      <Link href="/chat" className="p-2 text-xl md:hidden">
        <FaArrowLeft />
      </Link>
      <span className="py-2 truncate" title={subject}>
        {subject}
      </span>
    </div>
  );
};

export default ChatItemHeader;

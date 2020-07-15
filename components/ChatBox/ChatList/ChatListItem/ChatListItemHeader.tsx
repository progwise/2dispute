import React from 'react';
import DateTimeDistance from './DateTimeDistance';

interface ChatListItemHeaderProps {
  title: string;
  dateTime: string;
}

const ChatListItemHeader = ({
  title,
  dateTime,
}: ChatListItemHeaderProps): JSX.Element => (
  <div className="flex items-end space-x-1">
    <div className="truncate flex-grow" title={title}>
      {title}
    </div>
    <DateTimeDistance
      dateTime={dateTime}
      className="text-xs font-light whitespace-no-wrap"
    />
  </div>
);

export default ChatListItemHeader;

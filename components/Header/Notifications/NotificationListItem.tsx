import Link from 'next/link';
import React from 'react';
import DateTime from '../../Chat/components/ChatMessage/DateTime';

interface NotificationListItemProps {
  createdAt: string;
  picture: string;
  children: React.ReactNode;
  link: {
    href: string;
    as?: string;
  };
  read: boolean;
}

const NotificationListItem = ({
  createdAt,
  picture,
  children,
  link: { href, as },
  read,
}: NotificationListItemProps): JSX.Element => (
  <Link href={href} as={as}>
    <div className="border p-3 flex items-center cursor-pointer hover:bg-gray-200">
      <img
        className={`flex-shrink-0 w-12 h-12 rounded-full mr-3 ${
          read && 'opacity-50'
        }`}
        src={picture}
      />
      <div>
        <div className={`text-sm ${read && 'text-gray-600'}`}>{children}</div>
        <DateTime className="text-xs text-gray-600" dateTime={createdAt} />
      </div>
    </div>
  </Link>
);

export default NotificationListItem;

import { UrlObject } from 'url';
import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface ChatBoxNavItemProps {
  href: string | UrlObject;
  as?: string;
  icon: IconType;
  text: string;
}

const ChatBoxNavItem = ({
  href,
  as,
  icon: Icon,
  text,
}: ChatBoxNavItemProps): JSX.Element => (
  <Link href={href} as={as}>
    <a className="flex-1 p-2">
      <Icon className="mx-auto text-xl" />
      <div className="text-center text-sm">{text}</div>
    </a>
  </Link>
);

export default ChatBoxNavItem;

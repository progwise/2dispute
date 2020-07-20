import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from '../../Link/Link';

interface ChatBoxHeaderProps {
  header: string;
}

const ChatBoxHeader = ({ header }: ChatBoxHeaderProps): JSX.Element => (
  <div className="md:col-span-2 border-b px-4 flex items-center py-2">
    <Link href="/chat" className="p-2 text-xl md:hidden">
      <FaArrowLeft />
    </Link>
    <span className="py-2 truncate" title={header}>
      {header}
    </span>
  </div>
);

export default ChatBoxHeader;

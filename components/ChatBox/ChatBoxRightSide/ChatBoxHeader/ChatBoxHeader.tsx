import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from '../../../Link/Link';

interface ChatBoxHeaderProps {
  header: string;
  displayOnSmallDevices: boolean;
}

const ChatBoxHeader = ({
  header,
  displayOnSmallDevices,
}: ChatBoxHeaderProps): JSX.Element => (
  <div
    className={`row-start-1 col-start-1 md:col-start-2 md:col-span-2 border-b px-4 flex items-center py-2 ${
      displayOnSmallDevices ? '' : 'hidden'
    } md:flex truncate`}
  >
    <Link href="/" className="p-2 text-xl md:hidden">
      <FaArrowLeft />
    </Link>
    <span className="py-2 truncate" title={header}>
      {header}
    </span>
  </div>
);

export default ChatBoxHeader;

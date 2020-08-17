import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import Link from '../../../Link/Link';
import LogoSVG from '../../../Header/Logo/Logo.svg';

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
    } md:flex truncate space-x-2`}
  >
    <Link href="/" className="py-2 text-xl md:hidden">
      <FaChevronLeft />
    </Link>
    <span className="py-2 truncate flex-grow" title={header}>
      {header}
    </span>
    <img src={LogoSVG} className="h-8 w-8" />
  </div>
);

export default ChatBoxHeader;

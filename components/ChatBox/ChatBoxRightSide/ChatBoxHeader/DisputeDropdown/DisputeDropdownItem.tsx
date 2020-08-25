import { UrlObject } from 'url';
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface DisputeDropdownItemProps {
  children: ReactNode;
  href: string | UrlObject;
  isSelected?: boolean;
  onClick: () => void;
}

const DisputeDropdownItem = ({
  children,
  href,
  isSelected = false,
  onClick,
}: DisputeDropdownItemProps): JSX.Element => (
  <li>
    <Link href={href}>
      <a
        className={`cursor-pointer block py-2 px-4 hover:bg-gray-300 ${
          isSelected ? 'bg-gray-300 font-bold' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  </li>
);

export default DisputeDropdownItem;

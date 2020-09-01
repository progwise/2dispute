import { UrlObject } from 'url';
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface DisputeDropdownItemProps {
  children: ReactNode;
  href: string | UrlObject;
  as?: string;
  isSelected?: boolean;
  onClick: () => void;
}

const DisputeDropdownItem = ({
  children,
  href,
  as,
  isSelected = false,
  onClick,
}: DisputeDropdownItemProps): JSX.Element => (
  <li>
    <Link href={href} as={as}>
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

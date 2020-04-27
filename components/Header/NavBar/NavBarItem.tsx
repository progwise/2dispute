import React from 'react';
import Link from 'next/link';

interface NavBarItemProps {
  href: string;
  as?: string;
  children: React.ReactNode;
}

const NavBarItem = ({ children, href, as }: NavBarItemProps): JSX.Element => (
  <li className="pl-12 first:pl-0">
    <Link href={href} as={as}>
      <a>{children}</a>
    </Link>
  </li>
);

export default NavBarItem;

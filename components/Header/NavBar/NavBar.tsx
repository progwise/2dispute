import React from 'react';

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps): JSX.Element => (
  <nav className="pt-8 pb-4 font-bold">
    <ul className="flex flex-wrap justify-end space-x-12">{children}</ul>
  </nav>
);

export default NavBar;

import React from 'react';

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps): JSX.Element => (
  <nav className="pt-16 pb-8 font-bold">
    <ul className="flex justify-end">{children}</ul>
  </nav>
);

export default NavBar;

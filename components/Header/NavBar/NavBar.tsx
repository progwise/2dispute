import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Layout from '../../Layout';
import LogoSVG from '../Logo/Logo.svg';
import Link from '../../Link/Link';
import Notifications from '../Notifcations';

interface NavBarProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  showLogo: boolean;
}

const NavBar = ({
  children,
  isAuthenticated = false,
  showLogo,
}: NavBarProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toggle = (): void => setOpen(open => !open);

  return (
    <Layout className="sticky top-0 bg-white z-30 shadow-lg">
      <nav className="pt-4 font-bold flex flex-wrap justify-between items-center">
        <Link href="/">
          <img
            src={LogoSVG}
            className={`h-12 transition-opacity duration-100 ${
              !showLogo && 'opacity-0'
            }`}
          />
        </Link>
        <div className="md:hidden flex">
          {isAuthenticated && <Notifications className="px-4" />}
          <label
            className="cursor-pointer block md:hidden p-4 pr-0"
            onClick={toggle}
          >
            <FaBars />
          </label>
        </div>

        <ul
          className={`${
            open ? 'block' : 'hidden'
          } md:flex md:flex-wrap md:justify-end md:items-center md:space-x-12 w-full md:w-auto`}
        >
          {children}
        </ul>
      </nav>
    </Layout>
  );
};

export default NavBar;

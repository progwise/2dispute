import React from 'react';
import Link from 'next/link';
import LogoSVG from './Logo.svg';
import LogoTextPNG from './LogoText.png';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps): JSX.Element => (
  <Link href="/" as="/">
    <a className={className}>
      <div className="flex flex-wrap justify-center items-end">
        <img src={LogoSVG} className="w-32 h-32 px-5" />
        <img src={LogoTextPNG} className="max-h-24 px-5" />
      </div>
    </a>
  </Link>
);

export default Logo;

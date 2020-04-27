import React from 'react';
import LogoSVG from './Logo.svg';
import LogoTextPNG from './LogoText.png';

const Logo = (): JSX.Element => (
  <div className="flex flex-wrap justify-center items-end">
    <img src={LogoSVG} className="w-32 h-32 px-5" />
    <img src={LogoTextPNG} className="max-h-24 px-5" />
  </div>
);

export default Logo;

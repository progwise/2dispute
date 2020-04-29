import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  as?: string;
  className?: string;
  children: React.ReactNode;
}

const Link = ({ href, as, className, children }: LinkProps): JSX.Element => (
  <NextLink href={href} as={as}>
    <a className={`text-blue-600 underline ${className}`}>{children}</a>
  </NextLink>
);

export default Link;

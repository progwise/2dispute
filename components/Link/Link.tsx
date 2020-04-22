import React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link = ({ href, children }: LinkProps): JSX.Element => (
  <NextLink href={href}>
    <a className="text-blue-600 underline">{children}</a>
  </NextLink>
);

export default Link;

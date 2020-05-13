import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps): JSX.Element => (
  <div className={`px-8 ${className}`}>
    <div className="max-w-screen-lg mx-auto">{children}</div>
  </div>
);

export default Layout;

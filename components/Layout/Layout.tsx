import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div className="px-8">
    <div className="max-w-screen-lg mx-auto">{children}</div>
  </div>
);

export default Layout;

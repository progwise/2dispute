import React from 'react';

interface ScopeLinkProps {
  isSelected: boolean;
  children: React.ReactNode;
  onClick: () => unknown;
}

const ScopeLink = ({
  children,
  isSelected,
  onClick,
}: ScopeLinkProps): JSX.Element => (
  <a
    className={`text-blue-600 cursor-pointer ${
      isSelected && 'font-bold uppercase'
    }`}
    onClick={onClick}
  >
    {children}
  </a>
);

export default ScopeLink;

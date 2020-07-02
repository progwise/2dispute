import React from 'react';

interface TexBoxProps {
  position: 'left' | 'right';
  children: React.ReactNode;
}

const TextBox = ({ children, position }: TexBoxProps): JSX.Element => (
  <div
    className={`w-full px-3 py-4 space-y-8 ${
      position === 'left' ? 'bg-indigo-200' : 'bg-blue-200'
    }`}
  >
    {children}
  </div>
);

export default TextBox;

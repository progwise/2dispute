import React from 'react';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, type }: ButtonProps): JSX.Element => (
  <button
    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white transition duration-100 shadow-md"
    type={type}
  >
    {children}
  </button>
);

export default Button;

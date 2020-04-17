import React from 'react';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ children, type, onClick }: ButtonProps): JSX.Element => (
  <button
    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white transition duration-100 shadow-md"
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

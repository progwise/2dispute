import React from 'react';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  children,
  type,
  disabled = false,
  onClick,
}: ButtonProps): JSX.Element => (
  <button
    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white transition duration-100 shadow-md disabled:opacity-75"
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

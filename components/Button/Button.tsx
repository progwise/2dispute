import React from 'react';

interface ButtonProps {
  children: string;
}

const Button = ({ children }: ButtonProps): JSX.Element => (
  <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white transition duration-100 shadow-md">
    {children}
  </button>
);

export default Button;

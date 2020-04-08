import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, onChange }: InputProps): JSX.Element => (
  <label className="w-full flex flex-col text-center py-2">
    <span className="text-blue-600">{label}</span>
    <input
      className="border-2 rounded text-center text-lg"
      placeholder={placeholder}
      onChange={onChange}
    />
  </label>
);

export default Input;

import React from 'react';

interface InputProps {
  label: string;
  name?: string;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  placeholder,
  onChange,
  name,
  value,
}: InputProps): JSX.Element => (
  <label className="w-full flex flex-col text-center py-2">
    <span className="text-blue-600">{label}</span>
    <input
      className="border-2 rounded text-center text-lg"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </label>
);

export default Input;

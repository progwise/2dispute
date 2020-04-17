import React from 'react';
import InputError from './InputError';

interface InputProps {
  label: string;
  name?: string;
  placeholder: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const Input = ({
  label,
  placeholder,
  onChange,
  onBlur,
  name,
  value,
  error,
  disabled = false,
}: InputProps): JSX.Element => (
  <label className="w-full flex flex-col text-center py-2">
    <span className="text-blue-600">{label}</span>
    <input
      className="border-2 rounded text-center text-lg disabled:opacity-75"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
    />
    {error && <InputError error={error} />}
  </label>
);

export default Input;

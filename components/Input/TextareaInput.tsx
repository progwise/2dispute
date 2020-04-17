import React from 'react';
import { InputError } from '.';

interface TextareaInputProps {
  error?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value?: string;
}

const TextareaInput = ({
  error,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: TextareaInputProps): JSX.Element => (
  <>
    <textarea
      className="w-full border-2 disabled:opacity-75"
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    {error && <InputError error={error} />}
  </>
);

export default TextareaInput;

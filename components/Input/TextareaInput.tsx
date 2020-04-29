import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { InputError } from '.';

interface TextareaInputProps {
  disabled?: boolean;
  error?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value?: string;
}

const TextareaInput = ({
  disabled = false,
  error,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: TextareaInputProps): JSX.Element => (
  <>
    <TextareaAutosize
      className="w-full border-2 disabled:opacity-75"
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      rows={3}
    />
    {error && <InputError error={error} />}
  </>
);

export default TextareaInput;

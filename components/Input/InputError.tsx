import React from 'react';

interface InputErrorProps {
  error: string;
}

const InputError = ({ error }: InputErrorProps): JSX.Element => (
  <span className="text-red-600">{error}</span>
);

export default InputError;

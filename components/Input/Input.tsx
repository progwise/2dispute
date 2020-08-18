import React from 'react';
import { useField, useFormikContext } from 'formik';
import InputError from './InputError';

interface InputProps {
  label?: string;
  name: string;
  placeholder: string;
}

const Input = ({ label, placeholder, name }: InputProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const error = meta.touched ? meta.error : undefined;

  return (
    <label className="w-full flex flex-col text-center">
      {label ? <span className="text-blue-600">{label}</span> : null}
      <input
        className="border-2 rounded disabled:opacity-75"
        placeholder={placeholder}
        disabled={isSubmitting}
        {...field}
      />
      {error && <InputError error={error} />}
    </label>
  );
};

export default Input;

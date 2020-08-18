import React from 'react';
import { useField, useFormikContext } from 'formik';
import InputError from './InputError';

interface InputProps {
  label?: string;
  name: string;
  placeholder: string;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  name,
  className,
}: InputProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const error = meta.touched ? meta.error : undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="flex space-x-2">
        {label ? <span className="text-blue-600">{label}</span> : null}
        <input
          className="border-2 rounded disabled:opacity-75 flex-grow"
          placeholder={placeholder}
          disabled={isSubmitting}
          {...field}
        />
      </label>
      {error && <InputError error={error} />}
    </div>
  );
};

export default Input;

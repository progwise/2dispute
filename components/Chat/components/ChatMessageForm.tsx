import React from 'react';
import { useFormik } from 'formik';
import Button from '../../Button/Button';

export interface ChatFormValues {
  message: string;
}

interface ChatMessageFormProps {
  position: 'left' | 'right';
  submitButtonText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: ChatFormValues) => any;
}

const ChatMessageForm = ({
  position,
  submitButtonText,
  onSubmit,
}: ChatMessageFormProps): JSX.Element => {
  const formik = useFormik<ChatFormValues>({
    initialValues: { message: '' },
    onSubmit: values => onSubmit && onSubmit(values),
  });

  return (
    <form
      className={`${
        position === 'left' ? 'col-start-1' : 'col-start-2'
      } col-span-3`}
      onSubmit={formik.handleSubmit}
    >
      <textarea
        name="message"
        className="w-full border-2"
        placeholder="Deine Position"
        onChange={formik.handleChange}
        value={formik.values.message}
      ></textarea>
      <Button type="submit">{submitButtonText}</Button>
    </form>
  );
};

export default ChatMessageForm;

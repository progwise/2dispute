import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import InputError from '../../Input/InputError';

export interface ChatFormValues {
  message: string;
}

const chatFormSchema = Yup.object().shape<ChatFormValues>({
  message: Yup.string().required(),
});

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
    validationSchema: chatFormSchema,
    onSubmit: async (values, formikHelpers) => {
      onSubmit && (await onSubmit(values));
      formikHelpers.resetForm();
    },
  });

  return (
    <form
      className={`${
        position === 'left' ? 'col-start-1' : 'col-start-2'
      } col-span-3 flex flex-col items-start`}
      onSubmit={formik.handleSubmit}
    >
      <textarea
        name="message"
        className="w-full border-2"
        placeholder="Deine Position"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
      />
      {formik.touched.message && formik.errors.message && (
        <InputError error={formik.errors.message} />
      )}
      <Button type="submit">{submitButtonText}</Button>
    </form>
  );
};

export default ChatMessageForm;

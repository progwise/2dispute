import React from 'react';
import { useFormik } from 'formik';
import Yup from '../../../utils/yup';
import Button from '../../Button/Button';
import { TextareaInput } from '../../Input';

export interface ChatFormValues {
  message: string;
}

const chatFormSchema = Yup.object().shape<ChatFormValues>({
  message: Yup.string().required().label('Chat-Nachricht'),
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
      } md:col-span-3 flex flex-col items-start`}
      onSubmit={formik.handleSubmit}
    >
      <TextareaInput
        name="message"
        placeholder="Deine Position *"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        disabled={formik.isSubmitting}
        error={(formik.touched.message && formik.errors.message) || undefined}
      />
      <Button type="submit" disabled={formik.isSubmitting}>
        {submitButtonText}
      </Button>
    </form>
  );
};

export default ChatMessageForm;

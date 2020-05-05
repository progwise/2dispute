import React from 'react';
import { useFormik } from 'formik';
import Yup from '../../../utils/yup';
import Button from '../../Button/Button';
import { TextareaInput } from '../../Input';
import { ChatPersonFragment } from '../../../graphql/generated/graphql';
import ChatBubble from './ChatMessage/ChatBubble';

export interface ChatFormValues {
  message: string;
}

const chatFormSchema = Yup.object().shape<ChatFormValues>({
  message: Yup.string().required().label('Chat-Nachricht'),
});

interface ChatMessageFormProps {
  position: 'left' | 'right';
  submitButtonText: string;
  user: ChatPersonFragment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: ChatFormValues) => any;
}

const ChatMessageForm = ({
  position,
  submitButtonText,
  user,
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
    <ChatBubble position={position} author={user}>
      <form
        className="flex flex-col items-start space-y-2"
        onSubmit={formik.handleSubmit}
      >
        <TextareaInput
          name="message"
          placeholder="Deine Position *"
          onChange={(newValue): void =>
            formik.setFieldValue('message', newValue)
          }
          onBlur={formik.handleBlur}
          value={formik.values.message}
          disabled={formik.isSubmitting}
          error={(formik.touched.message && formik.errors.message) || undefined}
        />
        <Button type="submit" disabled={formik.isSubmitting}>
          {submitButtonText}
        </Button>
      </form>
    </ChatBubble>
  );
};

export default ChatMessageForm;

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import Yup from '../../../utils/yup';
import Button from '../../Button/Button';
import { TextareaInput } from '../../Input';
import { ChatPersonFragment } from '../../../graphql/generated/frontend';
import i18n from '../../../utils/i18n';
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
  const { t } = i18n.useTranslation();
  const handleSubmit = async (
    values: ChatFormValues,
    formikHelpers: FormikHelpers<ChatFormValues>,
  ): Promise<void> => {
    onSubmit && (await onSubmit(values));
    formikHelpers.resetForm();
  };

  return (
    <ChatBubble position={position} author={user}>
      <Formik<ChatFormValues>
        initialValues={{ message: '' }}
        validationSchema={chatFormSchema}
        onSubmit={handleSubmit}
      >
        {(formik): JSX.Element => (
          <Form className="flex flex-col items-start space-y-2">
            <TextareaInput
              name="message"
              placeholder={`${t('chat.form.yourPosition')} *`}
            />
            <Button type="submit" disabled={formik.isSubmitting}>
              {submitButtonText}
            </Button>
          </Form>
        )}
      </Formik>
    </ChatBubble>
  );
};

export default ChatMessageForm;

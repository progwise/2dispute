import React from 'react';
import { Formik, Form } from 'formik';
import Yup from '../../../../utils/yup';
import i18n from '../../../../utils/i18n';
import { TextareaInput } from '../../../Input';
import Button from '../../../Button/Button';
import { useEditMessageMutation } from '../../../../graphql/generated/frontend';

interface ChatMessageEditProps {
  id: string;
  text: string;
  onUpdate: () => void;
  onCancel: () => void;
}

interface ChatMessageFormValues {
  message: string;
}

const chatFormSchema = Yup.object().shape<ChatMessageFormValues>({
  message: Yup.string().required().label('Chat-Nachricht'),
});

const ChatMessageEdit = ({
  id,
  text,
  onCancel,
  onUpdate,
}: ChatMessageEditProps): JSX.Element => {
  const [editMessageMutation] = useEditMessageMutation();
  const { t } = i18n.useTranslation();

  const handleCancel = (): void => onCancel();

  const handleSubmit = async (values: ChatMessageFormValues): Promise<void> => {
    if (text !== values.message) {
      await editMessageMutation({
        variables: { messageId: id, text: values.message },
      });
    }
    onUpdate();
  };

  return (
    <Formik<ChatMessageFormValues>
      initialValues={{ message: text }}
      validationSchema={chatFormSchema}
      onSubmit={handleSubmit}
    >
      {(formik): JSX.Element => (
        <Form>
          <TextareaInput
            name="message"
            placeholder={`${t('chat.form.yourPosition')} *`}
          />
          <Button type="submit" disabled={formik.isSubmitting}>
            {t('chat.form.save')}
          </Button>{' '}
          <Button type="button" onClick={handleCancel}>
            {t('chat.form.cancel')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatMessageEdit;

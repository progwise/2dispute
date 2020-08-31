import React from 'react';
import { Formik, Form } from 'formik';
import Yup from '../../../../utils/yup';
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
          <TextareaInput name="message" placeholder="Deine Position *" />
          <Button type="submit" disabled={formik.isSubmitting}>
            Speichern
          </Button>{' '}
          <Button type="button" onClick={handleCancel}>
            Abbrechen
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatMessageEdit;

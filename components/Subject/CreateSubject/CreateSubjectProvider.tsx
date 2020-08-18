import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import Yup from '../../../utils/yup';
import { useCreateSubjectMutation } from '../../../graphql/generated/frontend';

export interface FormValues {
  subject: string;
  tweetLink: string;
  firstMessage: string;
}

interface CreateSubjectProviderProps {
  children: React.ReactNode;
}

const createSubjectSchema = Yup.object().shape<FormValues>({
  subject: Yup.string().required().label('Thema'),
  tweetLink: Yup.string().label('Twitter Link'),
  firstMessage: Yup.string().required().label('Chat-Nachricht'),
});

export const getTweetId = (tweetLink: string): string | undefined => {
  const twitterRegex = /twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/i;
  const [, tweetId] = tweetLink.match(twitterRegex) ?? [undefined, undefined];
  return tweetId;
};

const CreateSubjectProvider = ({
  children,
}: CreateSubjectProviderProps): JSX.Element | null => {
  const router = useRouter();
  const [createSubject] = useCreateSubjectMutation();

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const tweetId = getTweetId(values.tweetLink);
    const subjectValues = {
      firstMessage: values.firstMessage,
      subject: values.subject,
      tweetId,
    };

    const { data, errors } = await createSubject({
      variables: subjectValues,
      refetchQueries: ['ChatList'],
    });

    if (errors || !data) {
      throw new Error('submit failed');
    }

    const subjectId = data.createSubject.id;

    router.push({ pathname: '/', query: { chatId: subjectId } });
  };

  return (
    <Formik<FormValues>
      initialValues={{ subject: '', tweetLink: '', firstMessage: '' }}
      validationSchema={createSubjectSchema}
      onSubmit={handleSubmit}
    >
      {children}
    </Formik>
  );
};

export default CreateSubjectProvider;

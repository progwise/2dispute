import React from 'react';
import { useRouter } from 'next/router';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useFormik } from 'formik';
import Yup from '../../utils/yup';
import { Input, TextareaInput } from '../../components/Input';
import Button from '../../components/Button/Button';
import withApollo from '../../utils/withApollo';
import {
  useCreateSubjectMutation,
  useMeQuery,
} from '../../graphql/generated/graphql';
import ChatContainer from '../../components/Chat/components/ChatContainer';
import ChatBubble from '../../components/Chat/components/ChatMessage/ChatBubble';
import ChatItemFullWidth from '../../components/Chat/components/ChatItemFullWidth';

interface FormValues {
  subject: string;
  tweetLink: string;
  firstMessage: string;
}

const createSubjectSchema = Yup.object().shape<FormValues>({
  subject: Yup.string().required().label('Thema'),
  tweetLink: Yup.string().label('Twitter Link'),
  firstMessage: Yup.string().required().label('Chat-Nachricht'),
});

const getTweetId = (tweetLink: string): string | undefined => {
  const twitterRegex = /twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/i;
  const [, tweetId] = tweetLink.match(twitterRegex) ?? [undefined, undefined];
  return tweetId;
};

const CreateSubject = (): JSX.Element => {
  const [createSubject] = useCreateSubjectMutation();
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  const formik = useFormik<FormValues>({
    validationSchema: createSubjectSchema,
    initialValues: {
      subject: '',
      tweetLink: '',
      firstMessage: '',
    },
    onSubmit: async values => {
      const tweetId = getTweetId(values.tweetLink);
      const { data, errors } = await createSubject({
        variables: {
          subject: values.subject,
          tweetId,
          firstMessage: values.firstMessage,
        },
      });

      if (errors || data === undefined) {
        throw new Error('submit failed');
      }

      const subjectId = data.createSubject.id;

      router.push('/subjects/[subjectId]', `/subjects/${subjectId}`);
    },
  });

  const tweetId = getTweetId(formik.values.tweetLink);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Fehler...</p>;
  }

  if (!data.me) {
    router.push(`/api/login?redirectTo=${router.asPath}`);
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-xl text-center py-4">Create a Subject</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="subject"
            label="Das Thema *"
            placeholder="Neues Thema"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            error={formik.touched.subject ? formik.errors.subject : undefined}
            disabled={formik.isSubmitting}
          />
          <Input
            name="tweetLink"
            label="Twitter Link"
            placeholder="https://twitter.com/..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tweetLink}
            error={
              formik.touched.tweetLink ? formik.errors.tweetLink : undefined
            }
            disabled={formik.isSubmitting}
          />
          {tweetId && (
            <div className="px-4 mx-auto">
              <TwitterTweetEmbed
                tweetId={tweetId}
                key={tweetId}
                placeholder="Lade Tweet..."
                className="mx-auto"
                options={{
                  lang: 'de',
                  align: 'center',
                }}
              />
            </div>
          )}
          <ChatContainer>
            <ChatBubble position="left" author={data.me}>
              <TextareaInput
                name="firstMessage"
                placeholder="Deine Position *"
                onChange={(newValue): void =>
                  formik.setFieldValue('firstMessage', newValue)
                }
                onBlur={formik.handleBlur}
                value={formik.values.firstMessage}
                error={
                  formik.touched.firstMessage
                    ? formik.errors.firstMessage
                    : undefined
                }
                disabled={formik.isSubmitting}
              />
            </ChatBubble>
          </ChatContainer>
        </div>
        <ChatItemFullWidth className="py-4 flex justify-center">
          <Button type="submit" disabled={formik.isSubmitting}>
            Thema veröffentlichen
          </Button>
        </ChatItemFullWidth>
      </form>
    </>
  );
};

export default withApollo(CreateSubject);

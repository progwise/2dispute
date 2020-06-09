import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Form, Formik } from 'formik';
import Yup from '../../utils/yup';
import { Input, TextareaInput } from '../../components/Input';
import Button from '../../components/Button/Button';
import ChatContainer from '../../components/Chat/components/ChatContainer';
import ChatBubble from '../../components/Chat/components/ChatMessage/ChatBubble';
import ChatItemFullWidth from '../../components/Chat/components/ChatItemFullWidth';
import { ChatPersonFragment } from '../../graphql/generated/frontend';

interface FormValues {
  subject: string;
  tweetLink: string;
  firstMessage: string;
}

export interface FormSubmitValues {
  subject: string;
  tweetId: string | undefined;
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

interface CreateSubjectFormProps {
  handleSubmit: (values: FormSubmitValues) => Promise<void>;
  user: ChatPersonFragment;
}

const CreateSubjectForm = (props: CreateSubjectFormProps): JSX.Element => {
  const handleSubmit = (values: FormValues): Promise<void> => {
    const tweetId = getTweetId(values.tweetLink);
    return props.handleSubmit({
      firstMessage: values.firstMessage,
      subject: values.subject,
      tweetId,
    });
  };

  return (
    <Formik<FormValues>
      validationSchema={createSubjectSchema}
      initialValues={{ subject: '', tweetLink: '', firstMessage: '' }}
      onSubmit={handleSubmit}
    >
      {(formik): JSX.Element => {
        const tweetId = getTweetId(formik.values.tweetLink);

        return (
          <Form>
            <div>
              <Input
                name="subject"
                label="Das Thema *"
                placeholder="Neues Thema"
              />
              <Input
                name="tweetLink"
                label="Twitter Link"
                placeholder="https://twitter.com/..."
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
                <ChatBubble position="left" author={props.user}>
                  <TextareaInput
                    name="firstMessage"
                    placeholder="Deine Position *"
                  />
                </ChatBubble>
              </ChatContainer>
            </div>
            <ChatItemFullWidth className="py-4 flex justify-center">
              <Button type="submit" disabled={formik.isSubmitting}>
                Thema veröffentlichen
              </Button>
            </ChatItemFullWidth>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateSubjectForm;

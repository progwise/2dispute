import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Form, Formik } from 'formik';
import Yup from '../../../utils/yup';
import { Input, TextareaInput } from '../../Input';
import Button from '../../Button/Button';
import ChatContainer from '../../Chat/components/ChatContainer';
import ChatBubble from '../../Chat/components/ChatMessage/ChatBubble';
import ChatItemFullWidth from '../../Chat/components/ChatItemFullWidth';
import { ChatPersonFragment } from '../../../graphql/generated/frontend';
import SelectTweet from './SelectTweet';

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

enum State {
  Form,
  SelectTweet,
}

const CreateSubjectForm = (props: CreateSubjectFormProps): JSX.Element => {
  const [state, setState] = useState<State>(State.Form);

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

        const handleSelectTweet = (tweetLink: string): void => {
          formik.setFieldValue('tweetLink', tweetLink);
          setState(State.Form);
        };

        switch (state) {
          case State.Form:
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
                  <p className="text-center">
                    <a
                      className="cursor-pointer text-blue-600 underline"
                      onClick={(): void => setState(State.SelectTweet)}
                    >
                      Tweet aus deiner Timeline auswählen
                    </a>
                  </p>
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
          case State.SelectTweet:
            return (
              <SelectTweet
                onCancel={(): void => setState(State.Form)}
                onSelect={handleSelectTweet}
              />
            );
        }
      }}
    </Formik>
  );
};

export default CreateSubjectForm;

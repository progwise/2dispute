import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Form, useFormikContext } from 'formik';
import { Input, TextareaInput } from '../../../Input';
import Button from '../../../Button/Button';
import ChatContainer from '../../../Chat/components/ChatContainer';
import ChatBubble from '../../../Chat/components/ChatMessage/ChatBubble';
import ChatItemFullWidth from '../../../Chat/components/ChatItemFullWidth';
import { useMeQuery } from '../../../../graphql/generated/frontend';
import Loader from '../../../ChatBox/ChatList/Loader';
import { getTweetId, FormValues } from '../CreateSubjectProvider';
import SelectTweet from './SelectTweet';

enum State {
  Form,
  SelectTweet,
}

const CreateSubjectForm = (): JSX.Element | null => {
  const [state, setState] = useState<State>(State.Form);
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  const formik = useFormikContext<FormValues>();
  const tweetId = getTweetId(formik.values.tweetLink);

  const handleSelectTweet = (tweetLink: string): void => {
    formik.setFieldValue('tweetLink', tweetLink);
    setState(State.Form);
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <p>Fehler: {JSON.stringify(error)}</p>;
  }

  if (!data.me) {
    router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    return null;
  }

  console.log(formik.values);

  switch (state) {
    case State.Form:
      return (
        <Form>
          <div>
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
              <ChatBubble position="left" author={data.me}>
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
};

export default CreateSubjectForm;

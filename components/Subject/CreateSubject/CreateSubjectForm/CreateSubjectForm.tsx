import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Form, useFormikContext } from 'formik';
import { FaCaretSquareDown } from 'react-icons/fa';
import { Input, TextareaInput } from '../../../Input';
import Button from '../../../Button/Button';
import ChatContainer from '../../../Chat/components/ChatContainer';
import ChatBubble from '../../../Chat/components/ChatMessage/ChatBubble';
import ChatItemFullWidth from '../../../Chat/components/ChatItemFullWidth';
import { useMeQuery } from '../../../../graphql/generated/frontend';
import Loader from '../../../ChatBox/ChatList/Loader';
import { getTweetId, FormValues } from '../CreateSubjectProvider';
import SelectTweet from './SelectTweet';

const CreateSubjectForm = (): JSX.Element | null => {
  const [displayTweetSelect, setDisplayTweetSelect] = useState(false);
  const { data, loading, error } = useMeQuery();
  const router = useRouter();

  const formik = useFormikContext<FormValues>();
  const tweetId = getTweetId(formik.values.tweetLink);

  const handleSelectTweet = (tweetLink: string): void => {
    formik.setFieldValue('tweetLink', tweetLink);
    setDisplayTweetSelect(false);
  };

  const toggleDisplayTweets = (): void =>
    setDisplayTweetSelect(oldState => !oldState);

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

  return (
    <Form>
      <div>
        <div className="flex space-x-2 items-center text-blue-600">
          <Input
            className="flex-grow"
            name="tweetLink"
            label="Tweet:"
            placeholder="https://twitter.com/..."
          />
          <FaCaretSquareDown
            className="text-lg cursor-pointer"
            onClick={(): void => toggleDisplayTweets()}
          />
        </div>
        {displayTweetSelect ? (
          <SelectTweet onSelect={handleSelectTweet} />
        ) : null}
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
            <TextareaInput name="firstMessage" placeholder="Deine Position *" />
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
};

export default CreateSubjectForm;

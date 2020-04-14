import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useMutation } from '@apollo/react-hooks';
import withApollo from '../../utils/withApollo';
import createSubjectMutation from './createSubject.gql';

interface FormValues {
  subject: string;
  tweetLink: string;
}

const getTweetId = (tweetLink: string): string | undefined => {
  const twitterRegex = /twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/i;
  const [, tweetId] = tweetLink.match(twitterRegex) ?? [undefined, undefined];
  return tweetId;
};

const CreateDispute = (): JSX.Element => {
  const [createSubject, { data }] = useMutation(createSubjectMutation);
  const formik = useFormik<FormValues>({
    initialValues: {
      subject: '',
      tweetLink: '',
    },
    onSubmit: values => {
      const tweetId = getTweetId(values.tweetLink);
      return createSubject({ variables: { subject: values.subject, tweetId } });
    },
  });

  const tweetId = getTweetId(formik.values.tweetLink);

  return (
    <>
      <h1 className="text-xl text-center py-4">Create a Dispute</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Input
            name="subject"
            label="Das Thema"
            placeholder="Neues Thema"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
          <Input
            name="tweetLink"
            label="Twitter Link"
            placeholder="https://twitter.com/..."
            onChange={formik.handleChange}
            value={formik.values.tweetLink}
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
          <div className="grid grid-cols-4">
            <div className="col-span-2 flex flex-col items-center py-4">
              <img
                src="https://www.progwise.net/static/c7930b51fec4d6e53d183f2cefd721e7/9af95/michael-vogt.jpg"
                className="rounded-full w-32"
              />
              <span>Du</span>
            </div>
            <div className="col-span-2 flex flex-col items-center py-4">
              <img
                src="https://www.progwise.net/static/95ed2645d74a2c245115ee4b1b2dc864/9af95/pascal-helbig.jpg"
                className="rounded-full w-32"
              />
              <span>???</span>
            </div>
            <textarea
              className="col-start-1 col-span-3 border-2"
              placeholder="Deine Position"
            ></textarea>
          </div>
        </div>
        <div className="py-4">
          <Button type="submit">Veröffentlichen</Button>
        </div>
      </form>
    </>
  );
};

export default withApollo(CreateDispute);

import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { useTwitterTimelineQuery } from '../../../../graphql/generated/frontend';

interface SelectTweetProps {
  onSelect: (tweetLink: string) => void;
  onCancel: () => void;
}

const SelectTweet = (props: SelectTweetProps): JSX.Element => {
  const { data, loading, error } = useTwitterTimelineQuery();

  if (loading) {
    return <span>Loading</span>;
  }

  if (error || !data?.twitterTimeline) {
    return <span>Twitter Timeline konnte nicht geladen werden</span>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Tweet auswählen</h1>
      <p>
        <a
          className="cursor-pointer text-blue-600 underline"
          onClick={(): void => props.onCancel()}
        >
          Keinen Tweet verlinken
        </a>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-selectTweet max-w-full">
        {data.twitterTimeline.map(tweet => (
          <React.Fragment key={tweet.id}>
            <a
              className="cursor-pointer group text-4xl flex items-center justify-center pr-0 sm:pr-8 pt-12 sm:pt-0"
              onClick={(): void => props.onSelect(tweet.link)}
            >
              <FaRegCircle className="group-hover:hidden" />
              <FaRegCheckCircle className="hidden group-hover:block text-blue-600" />
            </a>
            <div>
              <TwitterTweetEmbed
                tweetId={tweet.id}
                placeholder="Lade Tweet..."
                options={{
                  lang: 'de',
                  width: '100%',
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SelectTweet;

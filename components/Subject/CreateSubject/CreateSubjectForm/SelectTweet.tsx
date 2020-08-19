import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { useTwitterTimelineQuery } from '../../../../graphql/generated/frontend';

interface SelectTweetProps {
  onSelect: (tweetLink: string) => void;
}

const SelectTweet = ({ onSelect }: SelectTweetProps): JSX.Element => {
  const { data, loading, error } = useTwitterTimelineQuery();

  if (loading) {
    return <span>Loading</span>;
  }

  if (error || !data?.twitterTimeline) {
    return <span>Twitter Timeline konnte nicht geladen werden</span>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-selectTweet max-w-full">
      {data.twitterTimeline.map(tweet => (
        <React.Fragment key={tweet.id}>
          <a
            className="cursor-pointer group text-4xl flex items-center justify-center pr-0 sm:pr-8 pt-12 sm:pt-0"
            onClick={(): void => onSelect(tweet.link)}
          >
            <FaRegCircle className="group-hover:hidden" />
            <FaRegCheckCircle className="hidden group-hover:block text-blue-600" />
          </a>
          <div className="relative">
            <TwitterTweetEmbed
              tweetId={tweet.id}
              placeholder={
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  Lade Tweet...
                </div>
              }
              options={{
                lang: 'de',
                width: '100%',
              }}
            />
            <div
              className="absolute inset-0 cursor-pointer hover:bg-blue-400 hover:bg-opacity-25"
              style={{
                // Q: Why inline styles and not tailwind classes?
                // A: We have to use the same sizes to match twitters layout.
                //    Tailwind uses rem as a unit, but twitter px.
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '15px',
              }}
              onClick={(): void => onSelect(tweet.link)}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectTweet;

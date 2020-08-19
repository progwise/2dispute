import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
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
    <div>
      {data.twitterTimeline.map(tweet => (
        <div key={tweet.id} className="relative">
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
              borderRadius: '15px',
              maxWidth: '550px',
            }}
            onClick={(): void => onSelect(tweet.link)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectTweet;

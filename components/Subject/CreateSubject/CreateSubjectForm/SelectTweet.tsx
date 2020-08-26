import React, { useState } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Waypoint } from 'react-waypoint';
import { useTwitterTimelineQuery } from '../../../../graphql/generated/frontend';

const TWEETS_PER_PAGE = 5;

interface SelectTweetProps {
  onSelect: (tweetLink: string) => void;
}

const SelectTweet = ({ onSelect }: SelectTweetProps): JSX.Element => {
  const { data, loading, error } = useTwitterTimelineQuery();
  const [page, setPage] = useState(0);

  if (loading) {
    return <span>Loading</span>;
  }

  if (error || !data?.twitterTimeline) {
    return <span>Twitter Timeline konnte nicht geladen werden</span>;
  }

  const numberOfTweets = (page + 1) * TWEETS_PER_PAGE;
  const maxPages = Math.ceil(data.twitterTimeline.length / TWEETS_PER_PAGE);

  const handleFetchMore = (): void => {
    if (page < maxPages - 1) {
      setPage(oldPage => oldPage + 1);
    }
  };

  const tweets = data.twitterTimeline.slice(0, numberOfTweets);

  return (
    <div>
      {tweets.map(tweet => (
        <div key={tweet.id} className="relative">
          <TwitterTweetEmbed
            tweetId={tweet.id}
            placeholder={<div className="min-h-48 my-3">Lade Tweet...</div>}
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
      <Waypoint
        key={tweets.length > 0 ? tweets[tweets.length - 1].id : undefined}
        onEnter={handleFetchMore}
        bottomOffset="-100px"
      />
    </div>
  );
};

export default SelectTweet;

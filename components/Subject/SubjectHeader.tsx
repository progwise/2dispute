import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

interface SubjectHeaderProps {
  tweetId?: string;
}

const SubjectHeader = ({ tweetId }: SubjectHeaderProps): JSX.Element | null => {
  if (!tweetId) {
    return null;
  }

  return (
    <div className="py-4 mx-auto">
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
  );
};

export default SubjectHeader;

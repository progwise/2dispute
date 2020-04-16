import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

interface SubjectHeaderProps {
  subject: string;
  tweetId?: string;
}

const SubjectHeader = ({
  subject,
  tweetId,
}: SubjectHeaderProps): JSX.Element => (
  <>
    <div className="w-full text-center py-2">
      <p className="text-blue-600">Das Thema</p>
      <p className="text-lg">{subject}</p>
    </div>
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
  </>
);

export default SubjectHeader;

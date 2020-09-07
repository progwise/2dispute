import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import i18n from '../../utils/i18n';

interface SubjectHeaderProps {
  tweetId?: string;
}

const SubjectHeader = ({ tweetId }: SubjectHeaderProps): JSX.Element | null => {
  const { t } = i18n.useTranslation();

  if (!tweetId) {
    return null;
  }

  return (
    <div className="py-4 mx-auto">
      <TwitterTweetEmbed
        tweetId={tweetId}
        key={tweetId}
        placeholder={t('chat.loadTweet')}
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

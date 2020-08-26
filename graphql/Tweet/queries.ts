/* eslint-disable @typescript-eslint/camelcase */

import Twitter from 'twitter-lite';
import { AuthenticationError } from 'apollo-server-micro';
import { QueryResolvers } from '../generated/backend';

const tweetQueries: QueryResolvers = {
  twitterTimeline: async (parent, args, context) => {
    try {
      if (!context.user) {
        throw new AuthenticationError('not authenticated');
      }

      const twitterClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
        access_token_key: context.user.twitter.oauth_token,
        access_token_secret: context.user.twitter.oauth_token_secret,
      });

      const timeline = await twitterClient.get('statuses/home_timeline', {
        include_entities: false,
        count: 200,
      });

      return timeline.map(tweet => {
        const user = tweet.user.screen_name;
        const id = tweet.id_str;
        const link = `https://twitter.com/${user}/status/${id}`;

        return { id, link };
      });
    } catch (err) {
      return null;
    }
  },
};

export default tweetQueries;

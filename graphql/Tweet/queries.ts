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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const timeline: any[] = await twitterClient.get(
        'statuses/home_timeline',
        {
          include_entities: false,
          count: 200,
        },
      );

      const edges = timeline.map(tweet => {
        const user: string = tweet.user.screen_name;
        const id: string = tweet.id_str;
        const link = `https://twitter.com/${user}/status/${id}`;

        return {
          cursor: id,
          node: { id, link },
        };
      });

      return {
        edges,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].node.id : '',
          endCursor: edges.length > 0 ? edges[edges.length - 1].node.id : '',
          hasNextPage: true,
          hasPreviousPage: true,
        },
      };
    } catch (err) {
      return null;
    }
  },
};

export default tweetQueries;

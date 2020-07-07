/* eslint-disable @typescript-eslint/camelcase */
import jwt from 'jsonwebtoken';
import Twitter from 'twitter-lite';
import { MongooseHelper } from '../graphql/mongoose';

interface CreateJwtOptions {
  mongoose: MongooseHelper;
  oauth_token: string;
  oauth_token_secret: string;
}

export default async (options: CreateJwtOptions): Promise<string> => {
  const userClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    access_token_key: options.oauth_token,
    access_token_secret: options.oauth_token_secret,
  });

  const verifyResponse = await userClient.get('account/verify_credentials', {
    skip_status: true,
    include_email: true,
  });
  const { id_str: twitterId, email } = verifyResponse;

  const user = await options.mongoose.models.User.findOneAndUpdate(
    { twitterId },
    { twitterId, email },
    { upsert: true, new: true },
  ).exec();
  if (!user) {
    throw new Error();
  }

  return jwt.sign(
    {
      ...user.toObject(),
      accessToken: {
        oauth_token: options.oauth_token,
        oauth_token_secret: options.oauth_token_secret,
      },
    },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '24h',
    },
  );
};

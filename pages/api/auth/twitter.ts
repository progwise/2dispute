/* eslint-disable @typescript-eslint/camelcase */

import { NextApiHandler } from 'next';
import Twitter from 'twitter-lite';
import createAbsoluteURL from '../../../utils/createAbsoluteURL';

const twitterHandler: NextApiHandler = async (req, res) => {
  const redirectTo = Array.isArray(req.query.redirectTo)
    ? req.query.redirectTo[0]
    : req.query.redirectTo;

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
  });

  const callbackUrl = createAbsoluteURL(req, 'api/auth/callback/twitter', {
    redirectTo,
  });

  const response = await client.getRequestToken(callbackUrl);
  if (response.oauth_callback_confirmed === 'false') {
    throw new Error();
  }

  const { oauth_token } = response;
  const redirectUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;

  res.statusCode = 302;
  res.setHeader('Location', redirectUrl);
  res.end();
};

export default twitterHandler;

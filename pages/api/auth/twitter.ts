/* eslint-disable @typescript-eslint/camelcase */

import { NextApiHandler } from 'next';
import Twitter from 'twitter-lite';
import jwt from 'jsonwebtoken';
import createAbsoluteURL from '../../../utils/createAbsoluteURL';
import mongooseMiddleware, {
  MyNextApiRequest,
} from '../../../graphql/mongoose';
import createJwt from '../../../utils/createJwt';
import { setCookie } from '../../../utils/cookie';
import constants from '../../../utils/constants';

const twitterHandler: NextApiHandler = async (req: MyNextApiRequest, res) => {
  const redirectTo = Array.isArray(req.query.redirectTo)
    ? req.query.redirectTo[0]
    : req.query.redirectTo;

  // If current token is valid renew token and redirect back to 2dispute:
  try {
    const { token } = req.cookies;

    const verifyResponse = jwt.verify(token, process.env.JWT_SECRET ?? '');
    const oauth_token = verifyResponse['accessToken']['oauth_token'];
    const oauth_token_secret =
      verifyResponse['accessToken']['oauth_token_secret'];

    const newToken = await createJwt({
      mongoose: req.mongoose,
      oauth_token,
      oauth_token_secret,
    });
    setCookie(res, constants.COOKIE_TOKEN_KEY, newToken);

    res.statusCode = 302;
    res.setHeader('Location', redirectTo ?? '/');
    res.end();
    return;
    // eslint-disable-next-line no-empty
  } catch (err) {}

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

export default mongooseMiddleware(twitterHandler);

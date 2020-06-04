/* eslint-disable @typescript-eslint/camelcase */
import { NextApiHandler } from 'next';
import Twitter from 'twitter-lite';
import jwt from 'jsonwebtoken';
import { setCookie } from '../../../../utils/cookie';
import mongooseMiddleware, {
  MyNextApiRequest,
} from '../../../../graphql/mongoose';
import createAbsoluteURL from '../../../../utils/createAbsoluteURL';

// TODO: handle error (try/catch)
const handler: NextApiHandler = async (req: MyNextApiRequest, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
  });

  let { oauth_token, oauth_verifier, redirectTo } = req.query;
  oauth_token = Array.isArray(oauth_token) ? oauth_token[0] : oauth_token;
  oauth_verifier = Array.isArray(oauth_verifier)
    ? oauth_verifier[0]
    : oauth_verifier;
  redirectTo = Array.isArray(redirectTo) ? redirectTo[0] : redirectTo;

  const accessToken = await client.getAccessToken({
    oauth_token,
    oauth_verifier,
  });

  const userClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    access_token_key: accessToken.oauth_token,
    access_token_secret: accessToken.oauth_token_secret,
  });

  const verifyResponse = await userClient.get('account/verify_credentials', {
    skip_status: true,
    include_email: true,
  });
  const { id: twitterId, email } = verifyResponse;

  const user = await req.mongoose.models.User.findOneAndUpdate(
    { twitterId },
    { twitterId, email },
    { upsert: true, new: true },
  ).exec();
  if (!user) {
    throw new Error();
  }

  const token = jwt.sign(
    {
      ...user.toObject(),
      accessToken: {
        oauth_token: accessToken.oauth_token,
        oauth_token_secret: accessToken.oauth_token_secret,
      },
    },
    process.env.JWT_SECRET ?? '',
    {
      expiresIn: '24h',
    },
  );

  setCookie(res, 'token', token);

  const redirectUrl = createAbsoluteURL(req, redirectTo);

  res.statusCode = 302;
  res.setHeader('Location', redirectUrl);
  res.end();
};

export default mongooseMiddleware(handler);

/* eslint-disable @typescript-eslint/camelcase */

import { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import mongooseMiddleware, {
  MyNextApiRequest,
} from '../../../graphql/mongoose';
import createJwt from '../../../utils/createJwt';
import { setCookie } from '../../../utils/cookie';

const renewHandler: NextApiHandler = async (req: MyNextApiRequest, res) => {
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
  setCookie(res, 'token', newToken);

  res.send('ok');
};

export default mongooseMiddleware(renewHandler);

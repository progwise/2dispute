/* eslint-disable @typescript-eslint/camelcase */

import { NextApiResponse } from 'next';
import Dataloader from 'dataloader';
import jwt from 'jsonwebtoken';
import { deleteCookie } from '../utils/cookie';
import constants from '../utils/constants';
import { getTwitterUserById, UserMapper } from './User';
import { MyNextApiRequest, MongooseHelper } from './mongoose';

interface User {
  id: string;
  twitter: {
    oauth_token: string;
    oauth_token_secret: string;
  };
}

export interface Context {
  user?: User;
  dataloaders: {
    userDataloader: Dataloader<string, UserMapper>;
  };
  mongoose: MongooseHelper;
}

const context = async ({
  req,
  res,
}: {
  req: MyNextApiRequest;
  res: NextApiResponse;
}): Promise<Context> => {
  const { token } = req.cookies;

  let user: User | undefined;
  if (token) {
    try {
      const verifyResult = jwt.verify(token, process.env.JWT_SECRET ?? '');
      user = {
        id: verifyResult['twitterId'],
        twitter: {
          oauth_token: verifyResult['accessToken'].oauth_token,
          oauth_token_secret: verifyResult['accessToken'].oauth_token_secret,
        },
      };
    } catch (err) {
      deleteCookie(res, constants.COOKIE_TOKEN_KEY);
    }
  }

  const userDataloader = new Dataloader<string, UserMapper>(userIds =>
    Promise.all(userIds.map(getTwitterUserById)),
  );

  return {
    user,
    dataloaders: {
      userDataloader,
    },
    mongoose: req.mongoose,
  };
};

export default context;

import { NextApiResponse } from 'next';
import Dataloader from 'dataloader';
import jwt from 'jsonwebtoken';
import { deleteCookie } from '../utils/cookie';
import constants from '../utils/constants';
import { getTwitterUserById, UserMapper } from './User';
import { MyNextApiRequest, MongooseHelper } from './mongoose';

export interface Context {
  user?: {
    id: string;
  };
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

  let userId: string | undefined;
  if (token) {
    try {
      const verifyResult = jwt.verify(token, process.env.JWT_SECRET ?? '');
      userId = verifyResult['twitterId'];
    } catch (err) {
      deleteCookie(res, constants.COOKIE_TOKEN_KEY);
    }
  }

  const userDataloader = new Dataloader<string, UserMapper>(userIds =>
    Promise.all(userIds.map(getTwitterUserById)),
  );

  return {
    user: userId === undefined ? undefined : { id: userId },
    dataloaders: {
      userDataloader,
    },
    mongoose: req.mongoose,
  };
};

export default context;

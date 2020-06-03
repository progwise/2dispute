import Dataloader from 'dataloader';
import jwt from 'jsonwebtoken';
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
}: {
  req: MyNextApiRequest;
}): Promise<Context> => {
  const { token } = req.cookies;

  let userId: string | undefined;
  if (token) {
    const verifyResult = jwt.verify(token, process.env.JWT_SECRET ?? '');
    userId = verifyResult['twitterId'];
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

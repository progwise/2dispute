import Dataloader from 'dataloader';
import auth0 from '../utils/auth0';
import { getUserById, UserMapper } from './User';
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
  const session = await auth0(req).getSession(req);
  const userId: string | undefined = session?.user.sub;

  const userDataloader = new Dataloader<string, UserMapper>(userIds =>
    Promise.all(userIds.map(getUserById)),
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

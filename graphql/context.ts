import { NextApiRequest } from 'next';
import Dataloader from 'dataloader';
import auth0 from '../utils/auth0';
import { User } from './generated/graphql';
import { getUserById } from './User';

export interface Context {
  subject: {
    getStore: () => SubjectStore;
    updateStore: (updatedStore: SubjectStore) => void;
  };
  user?: {
    id: string;
  };
  dataloaders: {
    userDataloader: Dataloader<string, User>;
  };
}

export interface MessageStoreItem {
  id: string;
  text: string;
  authorId: string;
}

export interface DisputeStoreItem {
  id: string;
  partnerIdA: string;
  partnerIdB: string;
  messages: MessageStoreItem[];
}

export interface SubjectStoreItem {
  id: string;
  subject: string;
  tweetId: string | null;
  userId: string;
  firstMessage: string;
  disputes: DisputeStoreItem[];
}
export type SubjectStore = SubjectStoreItem[];

let subjectStore: SubjectStore = [];

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const session = await auth0(req).getSession(req);
  const userId: string | undefined = session?.user.sub;

  const userDataloader = new Dataloader<string, User>(userIds =>
    Promise.all(userIds.map(getUserById)),
  );

  return {
    subject: {
      getStore: (): SubjectStore => subjectStore,
      updateStore: (updatedStore): void => {
        subjectStore = updatedStore;
      },
    },
    user: userId === undefined ? undefined : { id: userId },
    dataloaders: {
      userDataloader,
    },
  };
};

export default context;

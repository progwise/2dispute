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

let subjectStore: SubjectStore = [
  {
    id: '123',
    subject: 'Test Subject',
    tweetId: '1250049436799111168',
    userId: 'auth0|5e8ee039658e660c13004a03',
    firstMessage: 'Meiner Meinung nach...',
    disputes: [
      {
        id: '2',
        partnerIdA: 'auth0|5e8ee039658e660c13004a03',
        partnerIdB: 'auth0|5e8f367c9374050c0b984f1e',
        messages: [
          {
            id: '3',
            authorId: 'auth0|5e8ee039658e660c13004a03',
            text: 'Meiner Meinung nach...',
          },
          {
            id: '4',
            authorId: 'auth0|5e8f367c9374050c0b984f1e',
            text: 'Ich habe da eine andere Meinung',
          },
        ],
      },
    ],
  },
  {
    id: '1234',
    subject: 'Test 2',
    tweetId: null,
    userId: 'auth0|5e8f367c9374050c0b984f1e',
    firstMessage: 'Test2...',
    disputes: [],
  },
];

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

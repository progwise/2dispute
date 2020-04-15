import { NextApiRequest } from 'next';
import auth0 from '../utils/auth0';

export interface Context {
  subject: {
    getStore: () => SubjectStore;
    updateStore: (updatedStore: SubjectStore) => void;
  };
  user?: {
    id: string;
  };
}

export interface SubjectStoreItem {
  id: string;
  subject: string;
  tweetId: string | null;
  userId: string;
  firstMessage: string;
}
export type SubjectStore = SubjectStoreItem[];

let subjectStore: SubjectStore = [];

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const session = await auth0(req).getSession(req);
  const userId: string | undefined = session?.user.sub;

  return {
    subject: {
      getStore: (): SubjectStore => subjectStore,
      updateStore: (updatedStore): void => {
        subjectStore = updatedStore;
      },
    },
    user: userId === undefined ? undefined : { id: userId },
  };
};

export default context;

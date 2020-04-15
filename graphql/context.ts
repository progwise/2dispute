import { Subject } from './generated/graphql';
import { NextApiRequest } from 'next';
import auth0 from '../utils/auth0';

export interface Context {
  subject: {
    getStore: () => Subject[];
    updateStore: (updatedStore: Subject[]) => void;
  };
  user?: {
    id: string;
  };
}

let subjectStore: Subject[] = [];

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const session = await auth0(req).getSession(req);
  const userId: string | undefined = session?.user.sub;

  return {
    subject: {
      getStore: (): Subject[] => subjectStore,
      updateStore: (updatedStore): void => {
        subjectStore = updatedStore;
      },
    },
    user: userId === undefined ? undefined : { id: userId },
  };
};

export default context;

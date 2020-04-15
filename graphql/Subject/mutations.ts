import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../generated/graphql';
import { SubjectStoreItem } from '../context';
import { AuthenticationError } from 'apollo-server-micro';

const mutations: MutationResolvers = {
  createSubject: (_parent, { input }, context) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }

    const subject: SubjectStoreItem = {
      id: uuid(),
      subject: input.subject,
      tweetId: input.tweetId ?? null,
      userId: context.user?.id,
    };
    context.subject.updateStore([...context.subject.getStore(), subject]);
    return subject;
  },
};

export default mutations;

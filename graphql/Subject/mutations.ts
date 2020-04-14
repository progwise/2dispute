import { v4 as uuid } from 'uuid';
import { MutationResolvers, Subject } from '../generated/graphql';

const mutations: MutationResolvers = {
  createSubject: (_parent, { input }, context): Subject => {
    const subject: Subject = {
      id: uuid(),
      subject: input.subject,
      tweetId: input.tweetId,
    };
    context.subject.updateStore([...context.subject.getStore(), subject]);
    return subject;
  },
};

export default mutations;

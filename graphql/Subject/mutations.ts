import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../generated/graphql';
import { SubjectStoreItem, DisputeStoreItem } from '../context';
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
      firstMessage: input.firstMessage,
      disputes: [],
    };
    context.subject.updateStore([...context.subject.getStore(), subject]);
    return subject;
  },

  replyOnSubject: (_parent, { input: { subjectId, message } }, context) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }

    const chosenSubject = context.subject
      .getStore()
      .find(subject => subject.id === subjectId);

    if (chosenSubject === undefined) {
      throw new Error('Subject not found');
    }

    const newDispute: DisputeStoreItem = {
      id: uuid(),
      partnerIdA: chosenSubject.userId,
      partnerIdB: context.user.id,
      messages: [
        {
          id: uuid(),
          authorId: chosenSubject.userId,
          text: chosenSubject.firstMessage,
        },
        {
          id: uuid(),
          authorId: context.user.id,
          text: message,
        },
      ],
    };

    const updatedSubject: SubjectStoreItem = {
      ...chosenSubject,
      disputes: [...chosenSubject.disputes, newDispute],
    };

    const updatedStore = context.subject.getStore().map(subject => {
      if (subject.id === updatedSubject.id) {
        return updatedSubject;
      }
      return subject;
    });

    context.subject.updateStore(updatedStore);

    return newDispute;
  },
};

export default mutations;

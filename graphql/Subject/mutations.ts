import * as mongoose from 'mongoose';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { MutationResolvers } from '../generated/graphql';
import { DisputeDocument } from '../Dispute/DisputeSchema';

const mutations: MutationResolvers = {
  createSubject: (_parent, { input }, context) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }

    const newSubject = new context.mongoose.models.Subject({
      subject: input.subject,
      tweetId: input.tweetId,
      userId: context.user?.id,
      firstMessage: input.firstMessage,
      disputes: [],
      createdAt: new Date(),
    });

    return newSubject.save();
  },

  replyOnSubject: async (
    _parent,
    { input: { subjectId, message } },
    context,
  ) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }

    const subject = await context.mongoose.models.Subject.findById(subjectId);

    if (subject === null) {
      throw new ApolloError('Subject not found');
    }

    const now = new Date();

    const newDispute: DisputeDocument = {
      _id: mongoose.Types.ObjectId(),
      partnerIdA: subject.userId,
      partnerIdB: context.user.id,
      createdAt: now,
      messages: [
        {
          _id: mongoose.Types.ObjectId(),
          authorId: subject.userId,
          text: subject.firstMessage,
          createdAt: subject.createdAt,
        },
        {
          _id: mongoose.Types.ObjectId(),
          authorId: context.user.id,
          text: message,
          createdAt: now,
        },
      ],
    };

    subject.disputes.push(newDispute);
    await subject.save();

    return newDispute;
  },
};

export default mutations;

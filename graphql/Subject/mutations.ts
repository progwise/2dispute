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

    const newDispute: DisputeDocument = {
      _id: mongoose.Types.ObjectId(),
      partnerIdA: subject.userId,
      partnerIdB: context.user.id,
      messages: [
        {
          _id: mongoose.Types.ObjectId(),
          authorId: subject.userId,
          text: subject.firstMessage,
        },
        {
          _id: mongoose.Types.ObjectId(),
          authorId: context.user.id,
          text: message,
        },
      ],
    };

    subject.disputes.push(newDispute);
    await subject.save();

    return newDispute;
  },
};

export default mutations;

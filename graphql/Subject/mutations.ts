import mongoose from 'mongoose';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { MutationResolvers } from '../generated/backend';
import { DisputeDocument } from '../Dispute/DisputeSchema';
import trim from '../../utils/trim';
import { SubjectDocument } from './SubjectSchema';

const mutations: MutationResolvers = {
  createSubject: (_parent, { input }, context) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }

    const newSubject = new context.mongoose.models.Subject({
      subject: trim(input.subject),
      tweetId: input.tweetId,
      userId: context.user?.id,
      firstMessage: trim(input.firstMessage),
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

    let subject: SubjectDocument | null;
    try {
      subject = await context.mongoose.models.Subject.findById(
        subjectId,
      ).exec();

      if (subject === null) throw Error();
    } catch (err) {
      throw new ApolloError('Subject not found');
    }

    const now = new Date();

    const newDispute: DisputeDocument = {
      _id: mongoose.Types.ObjectId(),
      partnerIdA: subject.userId,
      partnerIdB: context.user.id,
      createdAt: now,
      lastMessageAt: now,
      messages: [
        {
          _id: mongoose.Types.ObjectId(),
          authorId: subject.userId,
          text: subject.firstMessage,
          createdAt: subject.createdAt,
          upVoters: [],
          downVoters: [],
        },
        {
          _id: mongoose.Types.ObjectId(),
          authorId: context.user.id,
          text: message,
          createdAt: now,
          upVoters: [],
          downVoters: [],
        },
      ],
    };

    subject.disputes.push(newDispute);
    await subject.save();

    return newDispute;
  },
  editSubjectTitle: async (parent, args, context) => {
    const subject = await context.mongoose.models.Subject.findById(
      mongoose.Types.ObjectId(args.subjectId),
    );

    if (!subject) {
      throw new ApolloError('subject not found');
    }

    if (subject.userId !== context.user?.id) {
      throw new ApolloError('user is not subject creator');
    }

    subject.subject = args.title;
    return subject.save();
  },
};

export default mutations;

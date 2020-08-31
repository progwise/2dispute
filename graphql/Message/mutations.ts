import mongoose from 'mongoose';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { MutationResolvers, UserVoting } from '../generated/backend';
import { SubjectDocument } from '../Subject/SubjectSchema';
import { subjectResolvers } from '../Subject';
import getUserVoting from './helpers/getUserVoting';
import { MessageDocument } from './MessageSchema';

const messageMutations: MutationResolvers = {
  vote: async (_parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }
    const userId = context.user.id;

    let subject: SubjectDocument | null;
    let message: MessageDocument | undefined;
    try {
      subject = await context.mongoose.models.Subject.findOne()
        .where('disputes.messages._id', mongoose.Types.ObjectId(args.messageId))
        .exec();

      const messages = subject?.disputes
        .map(dispute => dispute.messages)
        .flat();
      message = messages?.find(message => message._id.equals(args.messageId));

      if (!subject || !message) throw Error();
    } catch (err) {
      throw new ApolloError('message not found');
    }

    const currentUserVoting = getUserVoting(message, userId);
    if (args.voting === currentUserVoting) {
      return message;
    }

    // Remove users current vote:
    message.upVoters = message.upVoters.filter(voterId => voterId !== userId);
    message.downVoters = message.downVoters.filter(
      voterId => voterId !== userId,
    );

    // Update users vote:
    if (args.voting === UserVoting.Up) {
      message.upVoters.push(userId);
    } else if (args.voting === UserVoting.Down) {
      message.downVoters.push(userId);
    }

    await subject.save();

    return message;
  },

  editMessage: async (_parent, args, context, info) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    let subject: SubjectDocument | null;
    let updatedMessages: MessageDocument[] | undefined;
    let isMessageAFirstMessage: boolean;

    try {
      subject = await context.mongoose.models.Subject.findOne()
        .or([
          { _id: mongoose.Types.ObjectId(args.messageId) },
          { 'disputes.messages._id': mongoose.Types.ObjectId(args.messageId) },
        ])
        .exec();
      const messages = subject?.disputes
        .map(dispute => dispute.messages)
        .flat();

      isMessageAFirstMessage =
        subject?._id.equals(args.messageId) ||
        messages?.some(
          (message, index) => message._id.equals(args.messageId) && index === 0,
        );

      if (isMessageAFirstMessage) {
        updatedMessages = messages?.filter((_message, index) => index === 0);
      } else {
        updatedMessages = messages?.filter(message =>
          message._id.equals(args.messageId),
        );
      }

      if (!subject || !updatedMessages) throw Error();
    } catch (err) {
      throw new ApolloError('message not found');
    }

    if (
      updatedMessages.some(message => message.authorId !== context.user?.id)
    ) {
      throw new AuthenticationError('user not message author');
    }

    // Update DB:
    updatedMessages.forEach(message => (message.text = args.text));
    if (isMessageAFirstMessage) {
      subject.firstMessage = args.text;
    }
    await subject.save();

    if (isMessageAFirstMessage) {
      const firstMessageFromSubjectArray =
        typeof subjectResolvers.firstMessage === 'function'
          ? [await subjectResolvers.firstMessage(subject, {}, context, info)]
          : [];
      return [...firstMessageFromSubjectArray, ...updatedMessages];
    } else {
      return updatedMessages;
    }
  },
};

export default messageMutations;

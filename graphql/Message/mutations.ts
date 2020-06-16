import mongoose from 'mongoose';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { MutationResolvers, UserVoting } from '../generated/backend';
import { SubjectDocument } from '../Subject/SubjectSchema';
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
};

export default messageMutations;

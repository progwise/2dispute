import {
  AuthenticationError,
  ApolloError,
  ForbiddenError,
} from 'apollo-server-micro';
import * as mongoose from 'mongoose';
import { MutationResolvers } from '../generated/graphql';
import { MessageDocument } from '../Message/MessageSchema';

const mutations: MutationResolvers = {
  replyOnDispute: async (
    parent,
    { input: { disputeId, message } },
    context,
  ) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }
    const userId = context.user.id;

    const subject = await context.mongoose.models.Subject.findOne({
      'disputes._id': mongoose.Types.ObjectId(disputeId),
    });

    const selectedDispute = subject?.disputes.find(dispute =>
      dispute._id.equals(disputeId),
    );

    if (subject === null || selectedDispute === undefined) {
      throw new ApolloError('Dispute not found');
    }

    const isUserDisputePartner = [
      selectedDispute.partnerIdA,
      selectedDispute.partnerIdB,
    ].some(partnerId => partnerId === userId);

    if (!isUserDisputePartner) {
      throw new ForbiddenError('User is not a dispute partner');
    }

    const newMessage: MessageDocument = {
      _id: mongoose.Types.ObjectId(),
      authorId: userId,
      text: message,
      createdAt: new Date(),
    };
    selectedDispute.messages.push(newMessage);

    await subject.save();

    return selectedDispute;
  },
};

export default mutations;

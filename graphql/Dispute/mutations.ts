import {
  AuthenticationError,
  ApolloError,
  ForbiddenError,
} from 'apollo-server-micro';
import mongoose from 'mongoose';
import { MutationResolvers } from '../generated/backend';
import { MessageDocument } from '../Message/MessageSchema';
import trim from '../../utils/trim';

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

    const now = new Date();

    const newMessage: MessageDocument = {
      _id: mongoose.Types.ObjectId(),
      authorId: userId,
      text: trim(message),
      createdAt: now,
      upVoters: [],
      downVoters: [],
    };
    selectedDispute.messages.push(newMessage);
    selectedDispute.lastMessageAt = now;

    await subject.save();

    return selectedDispute;
  },
};

export default mutations;

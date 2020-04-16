import {
  AuthenticationError,
  ApolloError,
  ForbiddenError,
} from 'apollo-server-micro';
import { v4 as uuid } from 'uuid';
import { MutationResolvers } from '../generated/graphql';
import { MessageStoreItem, DisputeStoreItem, SubjectStore } from '../context';

const mutations: MutationResolvers = {
  replyOnDispute: (parent, { input: { disputeId, message } }, context) => {
    if (context.user === undefined) {
      throw new AuthenticationError('not authenticated');
    }
    const userId = context.user.id;

    const subjectStore = context.subject.getStore();
    const disputeList = subjectStore.map(subject => subject.disputes).flat();
    const dispute = disputeList.find(dispute => dispute.id === disputeId);

    if (dispute === undefined) {
      throw new ApolloError('Dispute not found');
    }

    const isUserDisputePartner = [dispute.partnerIdA, dispute.partnerIdB].some(
      partnerId => partnerId === userId,
    );

    if (!isUserDisputePartner) {
      throw new ForbiddenError('User is not a dispute partner');
    }

    const newMessage: MessageStoreItem = {
      id: uuid(),
      authorId: userId,
      text: message,
    };
    const updatedDispute: DisputeStoreItem = {
      ...dispute,
      messages: [...dispute.messages, newMessage],
    };
    const updatedStore: SubjectStore = subjectStore.map(subject => ({
      ...subject,
      disputes: subject.disputes.map(dispute =>
        dispute.id === updatedDispute.id ? updatedDispute : dispute,
      ),
    }));

    context.subject.updateStore(updatedStore);
    return updatedDispute;
  },
};

export default mutations;

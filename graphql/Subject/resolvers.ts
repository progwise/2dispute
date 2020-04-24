import { SubjectResolvers } from '../generated/graphql';
import { DisputeDocument } from '../Dispute/DisputeSchema';

const compareDisputesByLastMessageAt = (
  disputeA: DisputeDocument,
  disputeB: DisputeDocument,
): number =>
  disputeB.lastMessageAt.getTime() - disputeA.lastMessageAt.getTime();

const subjectResolvers: SubjectResolvers = {
  id: parent => parent._id,
  author: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.userId),
  firstMessage: parent => ({
    _id: parent._id,
    authorId: parent.userId,
    text: parent.firstMessage,
    createdAt: parent.createdAt,
  }),
  disputes: parent => parent.disputes.sort(compareDisputesByLastMessageAt),
  hasDisputes: parent => parent.disputes.length > 0,
};

export default subjectResolvers;

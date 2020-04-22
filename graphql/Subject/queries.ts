import { QueryResolvers } from '../generated/graphql';
import { DisputeDocument } from '../Dispute/DisputeSchema';
import { SubjectDocument } from './SubjectSchema';

const sortDisputes = (subject: SubjectDocument): SubjectDocument => {
  const compareDisputesByLastMessageAt = (
    disputeA: DisputeDocument,
    disputeB: DisputeDocument,
  ): number =>
    disputeB.lastMessageAt.getTime() - disputeA.lastMessageAt.getTime();

  const sortedDisputes = subject.disputes.sort(compareDisputesByLastMessageAt);
  return Object.assign(subject, { disputes: sortedDisputes });
};

const queries: QueryResolvers = {
  allSubjects: async (_parent, _inputs, context) => {
    const subjects = await context.mongoose.models.Subject.find({}).exec();
    return subjects.map(sortDisputes);
  },
  subject: async (_parent, { id }, context) => {
    const subject = await context.mongoose.models.Subject.findById(id).exec();
    return subject && sortDisputes(subject);
  },
};

export default queries;

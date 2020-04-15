import { DisputeResolvers } from '../generated/graphql';
import { getUserById } from '../User';

const resolvers: DisputeResolvers = {
  partnerA: parent => getUserById(parent.partnerIdA),
  partnerB: parent => getUserById(parent.partnerIdB),
  subject: (parent, _arg, context) => {
    const subjectList = context.subject.getStore();
    const subject = subjectList.find(subject =>
      subject.disputes.some(dispute => dispute.id === parent.id),
    );

    if (subject === undefined) throw new Error('Subject not found');
    return subject;
  },
};

export default resolvers;

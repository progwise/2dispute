import { DisputeResolvers } from '../generated/graphql';

const resolvers: DisputeResolvers = {
  partnerA: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.partnerIdA),
  partnerB: (parent, _args, context) =>
    context.dataloaders.userDataloader.load(parent.partnerIdB),
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

import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  dispute: (_parent, { id }, context) => {
    const subjectList = context.subject.getStore();
    const allDisputes = subjectList.map(subject => subject.disputes).flat();
    return allDisputes.find(dispute => dispute.id === id) ?? null;
  },
};

export default queries;

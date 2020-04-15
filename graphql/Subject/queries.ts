import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  allSubjects: (_parent, _inputs, context) => context.subject.getStore(),
  subject: (_parent, { id }, context) =>
    context.subject.getStore().find(subject => subject.id === id) ?? null,
};

export default queries;

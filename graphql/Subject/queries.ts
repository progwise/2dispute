import { QueryResolvers, Subject } from '../generated/graphql';

const queries: QueryResolvers = {
  allSubjects: (_parent, _inputs, context): Subject[] =>
    context.subject.getStore(),
};

export default queries;

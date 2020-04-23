import { QueryResolvers } from '../generated/graphql';
import { SubjectDocument } from './SubjectSchema';
import resolveConnection from '../helper/resolveConnection';

const queries: QueryResolvers = {
  allSubjects: async (_parent, args, context) =>
    resolveConnection<SubjectDocument>({
      args,
      mongooseModel: context.mongoose.models.Subject,
      sortString: '-createdAt _id',
    }),
  subject: (_parent, { id }, context) =>
    context.mongoose.models.Subject.findById(id).exec(),
};

export default queries;

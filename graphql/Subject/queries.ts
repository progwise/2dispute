import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  allSubjects: (_parent, _inputs, context) =>
    context.mongoose.models.Subject.find({}).exec(),
  subject: (_parent, { id }, context) =>
    context.mongoose.models.Subject.findById(id).exec(),
};

export default queries;

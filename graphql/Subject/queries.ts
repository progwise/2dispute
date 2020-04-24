import { QueryResolvers } from '../generated/graphql';
import { SubjectDocument } from './SubjectSchema';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';

const queries: QueryResolvers = {
  allSubjects: async (_parent, args, context) => {
    const connectionResolver = new DocumentConnectionResolver<SubjectDocument>(
      { args, sortString: '-createdAt _id' },
      context.mongoose.models.Subject,
    );
    return connectionResolver.getConnection();
  },
  subject: (_parent, { id }, context) =>
    context.mongoose.models.Subject.findById(id).exec(),
};

export default queries;

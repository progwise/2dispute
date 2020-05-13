import { QueryResolvers } from '../generated/backend';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';
import { SubjectDocument } from './SubjectSchema';

const queries: QueryResolvers = {
  allSubjects: async (_parent, args, context) => {
    const hasDisputes = args.filter?.hasDisputes ?? undefined;

    let filter = {};
    if (hasDisputes !== undefined) {
      filter = {
        ...filter,
        disputes: hasDisputes ? { $not: { $size: 0 } } : { $size: 0 },
      };
    }

    const connectionResolver = new DocumentConnectionResolver<SubjectDocument>(
      { args, sortString: '-createdAt _id' },
      context.mongoose.models.Subject,
      filter,
    );
    return connectionResolver.getConnection();
  },
  subject: (_parent, { id }, context) =>
    context.mongoose.models.Subject.findById(id).exec(),
};

export default queries;

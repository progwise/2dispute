import { UserResolvers } from '../generated/graphql';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';
import { SubjectDocument } from '../Subject/SubjectSchema';

const userResolvers: UserResolvers = {
  allSubjects: (parent, args, context) => {
    const connectionResolver = new DocumentConnectionResolver<SubjectDocument>(
      { args, sortString: '-createdAt _id' },
      context.mongoose.models.Subject,
      { userId: parent.id },
    );

    return connectionResolver.getConnection();
  },
};

export default userResolvers;

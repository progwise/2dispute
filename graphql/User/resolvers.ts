import { UserResolvers } from '../generated/graphql';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';
import { SubjectDocument } from '../Subject/SubjectSchema';
import AggregationConnectionResolver from '../helper/ConnectionResolver/AggregationConnectionResolver';
import { DisputeDocument } from '../Dispute/DisputeSchema';

const userResolvers: UserResolvers = {
  allSubjects: (parent, args, context) => {
    const connectionResolver = new DocumentConnectionResolver<SubjectDocument>(
      { args, sortString: '-createdAt _id' },
      context.mongoose.models.Subject,
      { userId: parent.id },
    );

    return connectionResolver.getConnection();
  },
  allDisputes: (parent, args, context) => {
    const filter = {
      $or: [
        { 'disputes.partnerIdA': parent.id },
        { 'disputes.partnerIdB': parent.id },
      ],
    };

    const connectionResolver = new AggregationConnectionResolver<
      DisputeDocument
    >(
      { args, sortString: '-disputes.lastMessageAt disputes._id' },
      context.mongoose.models.Subject,
      'disputes',
      filter,
    );

    return connectionResolver.getConnection();
  },
};

export default userResolvers;

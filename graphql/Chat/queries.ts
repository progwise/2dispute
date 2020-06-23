import { QueryResolvers } from '../generated/backend';

const queries: QueryResolvers = {
  chat: async (parent, args, context) => {
    const userId = context.user?.id;
    if (!userId) {
      return null;
    }

    const unwindSubjects = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match({
        $or: [
          { 'disputes.partnerIdA': userId },
          { 'disputes.partnerIdB': userId },
        ],
      })
      .sort('-disputes.lastMessageAt id')
      .exec();
    const disputes = unwindSubjects.map(subject => subject.disputes);

    return { items: disputes };
  },
};

export default queries;

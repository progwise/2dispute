import { QueryResolvers } from '../generated/backend';

const queries: QueryResolvers = {
  chat: async (parent, args, context) => {
    const userId = context.user?.id;
    if (!userId) {
      return null;
    }

    let where: object = {};
    let sort = '-disputes.lastMessageAt id';
    let reverse = false;
    if (args.before) {
      where = { 'disputes.lastMessageAt': { $gt: args.before } };
      sort = 'disputes.lastMessageAt -id';
      reverse = true;
    } else if (args.after) {
      where = { 'disputes.lastMessageAt': { $lt: args.after } };
    }

    const unwindSubjects = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match({
        $or: [
          { 'disputes.partnerIdA': userId },
          { 'disputes.partnerIdB': userId },
        ],
      })
      .match(where)
      .sort(sort)
      .limit(args.limit)
      .exec();
    const disputes = unwindSubjects.map(subject => subject.disputes);
    const items = reverse ? disputes.reverse() : disputes;
    const newestLastMessageAt =
      items.length > 0 ? items[0].lastMessageAt : null;
    const oldestLastMessageAt =
      items.length > 0 ? items[items.length - 1].lastMessageAt : null;

    const hasNextPage = async (): Promise<boolean> => {
      const result: [
        { count: number } | undefined,
      ] = await context.mongoose.models.Subject.aggregate()
        .unwind('disputes')
        .match({
          $or: [
            { 'disputes.partnerIdA': userId },
            { 'disputes.partnerIdB': userId },
          ],
        })
        .match(where)
        .count('count')
        .exec();

      return (result[0]?.count ?? 0) > args.limit;
    };

    return { items, newestLastMessageAt, oldestLastMessageAt, hasNextPage };
  },
};

export default queries;

// eslint-disable-next-line import/default
import escapeStringRegexp from 'escape-string-regexp';
import { Context } from '../context';
import { DisputeDocument } from '../Dispute/DisputeSchema';
import { ChatScope } from '../generated/backend';

const loadDisputes = async (
  args: {
    before?: string | null;
    after?: string | null;
    search?: string | null;
    limit: number;
    scope: ChatScope;
  },
  context: Context,
  userIds: string[],
): Promise<{
  items: DisputeDocument[];
  hasNextPage: () => Promise<boolean>;
}> => {
  const userId = context.user?.id;

  let beforeAfterMatch: object = {};
  let sort = '-disputes.lastMessageAt id';
  let reverse = false;
  if (args.before) {
    beforeAfterMatch = { 'disputes.lastMessageAt': { $gt: args.before } };
    sort = 'disputes.lastMessageAt -id';
    reverse = true;
  } else if (args.after) {
    beforeAfterMatch = { 'disputes.lastMessageAt': { $lt: args.after } };
  }

  const userMatch =
    args.scope === ChatScope.UserScope
      ? {
          $or: [
            { 'disputes.partnerIdA': userId },
            { 'disputes.partnerIdB': userId },
          ],
        }
      : {};
  const searchMatch = args.search
    ? {
        $or: [
          { subject: new RegExp(escapeStringRegexp(args.search), 'i') },
          { 'disputes.partnerIdA': { $in: userIds } },
          { 'disputes.partnerIdB': { $in: userIds } },
        ],
      }
    : {};

  const unwindSubjects = await context.mongoose.models.Subject.aggregate()
    .unwind('disputes')
    .match(userMatch)
    .match(beforeAfterMatch)
    .match(searchMatch)
    .sort(sort)
    .limit(args.limit)
    .exec();
  const disputes = unwindSubjects.map(subject => subject.disputes);
  const items = reverse ? disputes.reverse() : disputes;

  const hasNextPage = async (): Promise<boolean> => {
    const result: [
      { count: number } | undefined,
    ] = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match(userMatch)
      .match(beforeAfterMatch)
      .count('count')
      .exec();

    return (result[0]?.count ?? 0) > args.limit;
  };

  return {
    items,
    hasNextPage,
  };
};

export default loadDisputes;

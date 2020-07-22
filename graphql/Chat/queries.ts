import { QueryResolvers, ChatItem, ChatScope } from '../generated/backend';
import getUsersBySearch from '../User/getUsersBySearch';
import loadDisputes from './loadDisputes';
import loadSubjects from './loadSubjects';

const queries: QueryResolvers = {
  chat: async (parent, args, context) => {
    if (args.scope === ChatScope.UserScope && !context.user) {
      return null;
    }

    let userIds: string[] = [];
    if (args.search && args.search.trim() !== '') {
      const users = await getUsersBySearch(args.search, context.mongoose);
      userIds = users.map(user => user.id);
    }

    const [resultDisputes, resultSubjects] = await Promise.all([
      loadDisputes(args, context, userIds),
      loadSubjects(args, context, userIds),
    ]);

    const disputeItems = resultDisputes.items.map(dispute => ({
      updateAt: dispute.lastMessageAt,
      value: dispute,
    }));
    const subjectItems = resultSubjects.items.map(subject => ({
      updateAt: subject.createdAt,
      value: subject,
    }));

    const allLoadedItems = [...disputeItems, ...subjectItems].sort(
      (itemA, itemB) => itemB.updateAt.getTime() - itemA.updateAt.getTime(),
    );

    const getNewestElement = !args.before;
    const items = getNewestElement
      ? allLoadedItems.slice(0, args.limit) // first nth elements
      : allLoadedItems.slice(-args.limit); // last nth elements

    const hasNextPage = async (): Promise<boolean> => {
      const loadedLessItemsThenAsked = allLoadedItems.length < args.limit;
      const loadedMoreItemsThanNecessary = allLoadedItems.length > args.limit;

      if (loadedLessItemsThenAsked) {
        return false;
      }

      if (loadedMoreItemsThanNecessary) {
        return true;
      }

      const hasNextPages = await Promise.all([
        resultDisputes.hasNextPage(),
        resultSubjects.hasNextPage(),
      ]);
      return hasNextPages.includes(true);
    };

    return {
      items: (items.map(item => item.value) as unknown) as ChatItem[],
      newestLastUpdateAt:
        items.length > 0 ? items[0].updateAt.toISOString() : null,
      oldestLastUpdateAt:
        items.length > 0
          ? items[items.length - 1].updateAt.toISOString()
          : null,
      hasNextPage,
    };
  },

  chatItem: async (parent, args, context) => {
    try {
      const subject = await context.mongoose.models.Subject.findOne({
        $or: [{ _id: args.id }, { 'disputes._id': args.id }],
      }).exec();

      if (subject?._id.equals(args.id)) {
        return subject;
      }

      const dispute = subject?.disputes.find(dispute =>
        dispute._id.equals(args.id),
      );
      return dispute ?? null;
    } catch (e) {
      return null;
    }
  },
};

export default queries;

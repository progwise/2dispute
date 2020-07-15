import { QueryResolvers, ChatItem } from '../generated/backend';
import loadDisputes from './loadDisputes';
import loadSubjects from './loadSubjects';

const queries: QueryResolvers = {
  chat: async (parent, args, context) => {
    if (!context.user) {
      return null;
    }

    const [resultDisputes, resultSubjects] = await Promise.all([
      loadDisputes(args, context),
      loadSubjects(args, context),
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

    const getNewestElement = !!args.before || !args.after;
    const items = getNewestElement
      ? allLoadedItems.slice(0, args.limit) // first nth elements
      : allLoadedItems.slice(-args.limit); // last nth elements

    const hasNextPage = async (): Promise<boolean> => {
      const loadedMoreItemsThanNecessary = allLoadedItems.length > args.limit;
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
};

export default queries;

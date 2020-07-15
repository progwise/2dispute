// eslint-disable-next-line import/default
import escapeStringRegexp from 'escape-string-regexp';
import { Context } from '../context';
import { SubjectDocument } from '../Subject/SubjectSchema';

const loadSubjects = async (
  args: {
    before?: string | null;
    after?: string | null;
    search?: string | null;
    limit: number;
  },
  context: Context,
): Promise<{
  items: SubjectDocument[];
  hasNextPage: () => Promise<boolean>;
}> => {
  let beforeAfterWhere: object = {};
  let sort = '-createdAt id';
  let reverse = false;
  if (args.before) {
    beforeAfterWhere = { createdAt: { $gt: args.before } };
    sort = 'createdAt -id';
    reverse = true;
  } else if (args.after) {
    beforeAfterWhere = { createdAt: { $lt: args.after } };
  }

  const searchWhere = args.search
    ? {
        subject: { $regex: new RegExp(escapeStringRegexp(args.search), 'i') },
      }
    : {};
  const userWhere = { userId: context.user?.id };

  const subjects = await context.mongoose.models.Subject.find()
    .where(userWhere)
    .where(beforeAfterWhere)
    .where(searchWhere)
    .sort(sort)
    .limit(args.limit)
    .exec();

  const items = reverse ? subjects.reverse() : subjects;

  const hasNextPage = async (): Promise<boolean> => {
    const count = await context.mongoose.models.Subject.find()
      .where(userWhere)
      .where(beforeAfterWhere)
      .where(searchWhere)
      .countDocuments()
      .exec();

    return count > args.limit;
  };

  return {
    items,
    hasNextPage,
  };
};

export default loadSubjects;

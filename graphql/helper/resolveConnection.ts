import { Model, Document } from 'mongoose';
import { ApolloError } from 'apollo-server-micro';

interface Connection<T> {
  edges: {
    cursor: string;
    node: T;
  }[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface ResolveConnectionOption<T extends Document> {
  args: {
    after?: string;
    before?: string;
    first: number;
    last: number;
  };

  /**format: "-createdAt id" */
  sortString: string;
  mongooseModel: Model<T>;
}

/**
 * This function builds a where object to find elements after a specific item.
 * It is recommended that the last field in the sortString is unique (e.g. _id).
 *
 * @param sortString Sort string as defined here: https://mongoosejs.com/docs/api.html#query_Query-sort
 * @param item
 *
 * @example
 * buildWhere('createdAt _id', {createdAt: '2020-04-22', _id: '0'}):
 *
 * {
 *  "$or": [
 *    {
 *     "createdAt": { "$gt": "2020-04-22" }
 *    },
 *    {
 *      "createdAt": "2020-04-22",
 *      "_id": { "$gt": "0" }
 *    }
 *  ]
 * }
 */
const buildWhere = (sortString: string, item: {}): {} => {
  const fields = sortString.split(' ');

  let $or: unknown[] = [];

  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    let $and = {};
    for (let i = 0; i <= fieldIndex; i++) {
      const field = fields[i];
      const fieldName = field.charAt(0) === '-' ? field.substr(1) : field;
      const fieldValue = item[fieldName];
      const fieldDirection = field.charAt(0) === '-' ? 'desc' : 'asc';

      let newAnd;
      if (i === fieldIndex) {
        newAnd = {
          [fieldName]: {
            [fieldDirection === 'asc' ? '$gt' : '$lt']: fieldValue,
          },
        };
      } else {
        newAnd = { [fieldName]: fieldValue };
      }
      $and = { ...$and, ...newAnd };
    }
    $or = [...$or, $and];
  }

  return { $or };
};

const idToCursor = (id: string): string => Buffer.from(id).toString('base64');
const cursorToId = (cursor: string): string =>
  Buffer.from(cursor, 'base64').toString('ascii');

const resolveConnection = async <T extends Document>({
  sortString,
  args: { after, before, first, last },
  mongooseModel,
}: ResolveConnectionOption<T>): Promise<Connection<T>> => {
  const reversedSortString = sortString
    .split(' ')
    .map(field => (field.charAt(0) === '-' ? field.substr(1) : `-${field}`))
    .join(' ');

  let items: T[];

  if (after) {
    const afterItemId = cursorToId(after);
    const afterItem = await mongooseModel.findById(afterItemId).exec();

    if (afterItem === null) throw new ApolloError('after cursor not found');

    items = await mongooseModel
      .find()
      .sort(sortString)
      .where(buildWhere(sortString, afterItem))
      .limit(first)
      .exec();
  } else if (before) {
    const beforeItemId = cursorToId(before);
    const beforeItem = await mongooseModel.findById(beforeItemId).exec();

    if (beforeItem === null) throw new ApolloError('before cursor not found');

    items = await mongooseModel
      .find()
      .sort(reversedSortString)
      .where(buildWhere(reversedSortString, beforeItem))
      .limit(last)
      .exec();

    items = items.reverse();
  } else {
    items = await mongooseModel.find().sort(sortString).limit(first).exec();
  }

  const firstItem: T | undefined = items[0];
  const lastItem: T | undefined = items[items.length - 1];

  const countsBeforeStartQuery = firstItem
    ? mongooseModel
        .countDocuments({})
        .sort(reversedSortString)
        .where(buildWhere(reversedSortString, firstItem))
        .exec()
    : 0;
  const countsAfterEndQuery = lastItem
    ? mongooseModel
        .countDocuments({})
        .sort(sortString)
        .where(buildWhere(sortString, lastItem))
        .exec()
    : 0;

  const [countsBeforeStart, countsAfterEnd] = await Promise.all([
    countsBeforeStartQuery,
    countsAfterEndQuery,
  ]);

  const edges = items.map(item => ({
    cursor: idToCursor(item.id),
    node: item,
  }));

  return {
    edges,
    pageInfo: {
      startCursor: edges[0]?.cursor ?? '',
      endCursor: edges[edges.length - 1]?.cursor ?? '',
      hasNextPage: countsAfterEnd > 0,
      hasPreviousPage: countsBeforeStart > 0,
    },
  };
};

export default resolveConnection;

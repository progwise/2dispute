import getValueByPath from '../getValueByPath';

export interface ConnectionResolverOptions {
  args: {
    after?: string;
    before?: string;
    first: number;
    last: number;
  };
  sortString: string;
}

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

export default abstract class ConnectionResolver<T> {
  private options: ConnectionResolverOptions;

  constructor(options: ConnectionResolverOptions) {
    this.options = options;
  }

  public async getConnection(): Promise<Connection<T>> {
    const reversedSortString = this.options.sortString
      .split(' ')
      .map(field => (field.charAt(0) === '-' ? field.substr(1) : `-${field}`))
      .join(' ');

    let items: T[];

    if (this.options.args.after) {
      items = await this.getAfter(
        this.options.args.after,
        this.options.sortString,
        this.options.args.first,
      );
    } else if (this.options.args.before) {
      items = await this.getAfter(
        this.options.args.before,
        reversedSortString,
        this.options.args.last,
      );
      items = items.reverse();
    } else {
      items = await this.getAll(
        this.options.sortString,
        this.options.args.first,
      );
    }

    const firstItem: T | undefined = items[0];
    const lastItem: T | undefined = items[items.length - 1];

    const countsBeforeStartQuery = firstItem
      ? this.getCountsAfter(firstItem, reversedSortString)
      : 0;
    const countsAfterEndQuery = lastItem
      ? this.getCountsAfter(lastItem, this.options.sortString)
      : 0;

    const [countsBeforeStart, countsAfterEnd] = await Promise.all([
      countsBeforeStartQuery,
      countsAfterEndQuery,
    ]);

    const edges = items.map(item => ({
      cursor: this.getCursor(item),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected buildWhere(sortString: string, item: any): {} {
    const fields = sortString.split(' ');

    let $or: unknown[] = [];

    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
      let $and = {};
      for (let i = 0; i <= fieldIndex; i++) {
        const field = fields[i];
        const fieldName = field.charAt(0) === '-' ? field.substr(1) : field;
        const fieldValue = getValueByPath(item, fieldName);
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
  }

  protected abstract getAfter(
    after: string,
    sortString: string,
    limit: number,
  ): Promise<T[]>;
  protected abstract getAll(sortString: string, limit: number): Promise<T[]>;
  protected abstract getCountsAfter(
    item: T,
    sortString: string,
  ): Promise<number>;
  protected abstract getCursor(item: T): string;
}

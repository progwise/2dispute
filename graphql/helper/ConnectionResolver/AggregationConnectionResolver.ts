/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose, { Model } from 'mongoose';
import { ApolloError } from 'apollo-server-micro';
import getValueByPath from '../getValueByPath';
import ConnectionResolver, {
  ConnectionResolverOptions,
} from './ConnectionResolver';

export default class AggregationConnectionResolver<
  T
> extends ConnectionResolver<T> {
  private mongooseModel: Model<any>;
  private unwind: string;

  constructor(
    options: ConnectionResolverOptions,
    mongooseModel: Model<any>,
    unwind: string,
  ) {
    super(options);
    this.mongooseModel = mongooseModel;
    this.unwind = unwind;
  }

  protected async getAfter(
    after: string,
    sortString: string,
    limit: number,
  ): Promise<T[]> {
    const afterId = this.getIdFromCursor(after);
    let afterItem = await this.mongooseModel
      .aggregate()
      .unwind(this.unwind)
      .match({ 'disputes._id': mongoose.Types.ObjectId(afterId) })
      .exec();
    afterItem = afterItem[0];

    if (!afterItem) throw new ApolloError('after cursor not found');

    const aggregationResult = await this.mongooseModel
      .aggregate()
      .unwind(this.unwind)
      .sort(sortString)
      .match(this.buildWhere(sortString, afterItem))
      .limit(limit)
      .exec();

    return aggregationResult.map(subject =>
      getValueByPath(subject, this.unwind),
    );
  }

  protected async getAll(sortString: string, limit: number): Promise<T[]> {
    const aggregationResult = await this.mongooseModel
      .aggregate()
      .unwind(this.unwind)
      .sort(sortString)
      .limit(limit)
      .exec();
    return aggregationResult.map(subject =>
      getValueByPath(subject, this.unwind),
    );
  }

  protected async getCountsAfter(item: T, sortString: string): Promise<number> {
    const data = await this.mongooseModel
      .aggregate()
      .unwind(this.unwind)
      .match(this.buildWhere(sortString, { [this.unwind]: item }))
      .count('count')
      .exec();

    return data[0]?.count ?? 0;
  }

  protected getCursor(item: T): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return Buffer.from(item._id.toString()).toString('base64');
  }

  private getIdFromCursor(cursor: string): string {
    return Buffer.from(cursor, 'base64').toString('ascii');
  }
}

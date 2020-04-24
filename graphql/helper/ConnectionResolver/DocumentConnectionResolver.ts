import { Document, Model } from 'mongoose';
import { ApolloError } from 'apollo-server-micro';
import ConnectionResolver, {
  ConnectionResolverOptions,
} from './ConnectionResolver';

export default class DocumentConnectionResolver<
  T extends Document
> extends ConnectionResolver<T> {
  private mongooseModel: Model<T>;
  private filter = {};

  constructor(
    options: ConnectionResolverOptions,
    mongooseModel: Model<T>,
    filter: {},
  ) {
    super(options);
    this.mongooseModel = mongooseModel;
    this.filter = filter;
  }

  protected async getAfter(
    after: string,
    sortString: string,
    limit: number,
  ): Promise<T[]> {
    const afterId = this.getIdFromCursor(after);
    const afterItem = await this.mongooseModel
      .findById(afterId)
      .where(this.filter)
      .exec();

    if (afterItem === null) throw new ApolloError('after cursor not found');

    return this.mongooseModel
      .find()
      .sort(sortString)
      .where(this.buildWhere(sortString, afterItem))
      .where(this.filter)
      .limit(limit)
      .exec();
  }

  protected getAll(sortString: string, limit: number): Promise<T[]> {
    return this.mongooseModel
      .find()
      .where(this.filter)
      .sort(sortString)
      .limit(limit)
      .exec();
  }

  protected getCountsAfter(item: T, sortString: string): Promise<number> {
    return this.mongooseModel
      .countDocuments({})
      .where(this.buildWhere(sortString, item))
      .where(this.filter)
      .exec();
  }

  protected getCursor(item: T): string {
    return Buffer.from(item._id.toString()).toString('base64');
  }

  private getIdFromCursor(cursor: string): string {
    return Buffer.from(cursor, 'base64').toString('ascii');
  }
}

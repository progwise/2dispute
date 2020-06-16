import mongoose from 'mongoose';
import { QueryResolvers } from '../generated/backend';
import AggregationConnectionResolver from '../helper/ConnectionResolver/AggregationConnectionResolver';
import { DisputeDocument } from './DisputeSchema';

const queries: QueryResolvers = {
  allDisputes: async (_parent, args, context) => {
    const connectionResolver = new AggregationConnectionResolver<
      DisputeDocument
    >(
      { args, sortString: '-disputes.lastMessageAt disputes._id' },
      context.mongoose.models.Subject,
      'disputes',
    );

    return connectionResolver.getConnection();
  },
  dispute: async (_parent, { id }, context) => {
    try {
      const data = await context.mongoose.models.Subject.aggregate()
        .unwind('disputes')
        .match({ 'disputes._id': mongoose.Types.ObjectId(id) })
        .exec();

      return data[0]?.disputes || null;
    } catch (err) {
      return null;
    }
  },
};

export default queries;

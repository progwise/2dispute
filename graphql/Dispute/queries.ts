import * as mongoose from 'mongoose';
import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  dispute: async (_parent, { id }, context) => {
    const data = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match({ 'disputes._id': mongoose.Types.ObjectId(id) })
      .exec();

    return data[0]?.disputes || null;
  },
};

export default queries;

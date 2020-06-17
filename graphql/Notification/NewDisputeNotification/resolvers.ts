import mongoose from 'mongoose';
import { NewDisputeNotificationResolvers } from '../../generated/backend';

const newDisputeNotificationResolvers: NewDisputeNotificationResolvers = {
  dispute: async (parent, _args, context) => {
    const data = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .match({ 'disputes._id': mongoose.Types.ObjectId(parent.disputeId) })
      .exec();

    return data[0]?.disputes || undefined;
  },
};

export default newDisputeNotificationResolvers;

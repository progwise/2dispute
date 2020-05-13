import * as mongoose from 'mongoose';
import { NewMessageNotificationResolvers } from '../../generated/backend';

const newMessageNotificationResolvers: NewMessageNotificationResolvers = {
  message: async (parent, _args, context) => {
    const data = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .unwind('disputes.messages')
      .match({
        'disputes.messages._id': mongoose.Types.ObjectId(parent.messageId),
      })
      .exec();

    return data[0]?.disputes.messages || undefined;
  },
};

export default newMessageNotificationResolvers;

import { AuthenticationError } from 'apollo-server-micro';
import { QueryResolvers } from '../generated/backend';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';
import {
  NewDisputeNotificationDocument,
  NewMessageNotificationDocument,
} from './NotificationSchema';

const queries: QueryResolvers = {
  allNotifications: async (_parent, args, context) => {
    if (!context.user) {
      return null;
    }

    const connectionResolver = new DocumentConnectionResolver<
      NewDisputeNotificationDocument | NewMessageNotificationDocument
    >(
      { args, sortString: '-createdAt _id' },
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      context.mongoose.models.Notification,
      { userId: context.user.id },
    );

    const totalCountRequest = context.mongoose.models.Notification.find()
      .where('userId', context.user.id)
      .countDocuments()
      .exec();

    const connectionRequest = connectionResolver.getConnection();

    const [totalCount, connection] = await Promise.all([
      totalCountRequest,
      connectionRequest,
    ]);

    return {
      ...connection,
      totalCount,
    };
  },
  notificationStatus: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    const totalCountUnread = await context.mongoose.models.Notification.find()
      .where('userId', context.user.id)
      .where('read', false)
      .countDocuments()
      .exec();

    return { totalCountUnread };
  },
};

export default queries;

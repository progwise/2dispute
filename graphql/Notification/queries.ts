import { ApolloError } from 'apollo-server-micro';
import { QueryResolvers } from '../generated/graphql';
import DocumentConnectionResolver from '../helper/ConnectionResolver/DocumentConnectionResolver';
import {
  NewDisputeNotificationDocument,
  NewMessageNotificationDocument,
} from './NotificationSchema';

const queries: QueryResolvers = {
  allNotifications: async (_parent, args, context) => {
    if (!context.user) {
      throw new ApolloError('User not found');
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
      .count()
      .exec();

    const totalCountUnreadRequest = context.mongoose.models.Notification.find()
      .where('userId', context.user.id)
      .where('read', false)
      .count()
      .exec();

    const connectionRequest = connectionResolver.getConnection();

    const [totalCount, totalCountUnread, connection] = await Promise.all([
      totalCountRequest,
      totalCountUnreadRequest,
      connectionRequest,
    ]);

    return {
      ...connection,
      totalCount,
      totalCountUnread,
    };
  },
};

export default queries;

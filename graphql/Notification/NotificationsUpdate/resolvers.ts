import { AuthenticationError } from 'apollo-server-micro';
import { NotificationsUpdateResolvers } from '../../generated/graphql';

const notificationsUpdateResolvers: NotificationsUpdateResolvers = {
  updatedNotification: parent => parent.updatedNotifications,
  notificationStatus: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    const totalCountUnread = await context.mongoose.models.Notification.find()
      .where('userId', context.user.id)
      .where('read', false)
      .count()
      .exec();

    return { totalCountUnread };
  },
};

export default notificationsUpdateResolvers;

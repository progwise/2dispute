import { ApolloError, AuthenticationError } from 'apollo-server-micro';
import { MutationResolvers } from '../generated/graphql';

const notificationMutations: MutationResolvers = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  markNotificationAsRead: async (parent, { id }, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    const notification = await context.mongoose.models.Notification.findOne({
      _id: id,
      userId: context.user.id,
    });

    if (!notification) {
      throw new ApolloError('notification not found');
    }

    notification.read = true;
    return notification.save();
  },
};

export default notificationMutations;

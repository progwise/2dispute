import { NotificationResolvers } from '../generated/graphql';

const notificationResolvers: NotificationResolvers = {
  __resolveType: parent => parent.type,
};

export default notificationResolvers;

import { NotificationResolvers } from '../generated/backend';

const notificationResolvers: NotificationResolvers = {
  __resolveType: parent => parent.type,
};

export default notificationResolvers;

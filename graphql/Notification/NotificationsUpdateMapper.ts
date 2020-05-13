import { ResolversTypes } from '../../graphql/generated/backend';

export type NotificationsUpdateMapper = {
  updatedNotifications: Array<ResolversTypes['Notification']>;
};

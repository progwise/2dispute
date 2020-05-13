import * as mongoose from 'mongoose';
import { ApolloError, AuthenticationError } from 'apollo-server-micro';
import { MutationResolvers } from '../generated/backend';
import {
  NewDisputeNotificationDocument,
  NewMessageNotificationDocument,
} from './NotificationSchema';

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  markMultipleNotificationAsRead: async (parent, { latestId }, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    const latestNotification = await context.mongoose.models.Notification.findOne(
      { _id: latestId, userId: context.user.id },
    ).exec();

    if (!latestNotification) {
      throw new ApolloError('notification not found');
    }

    const notificationsToUpdate: {
      _id: string;
    }[] = await context.mongoose.models.Notification.find()
      .select('_id')
      .where('userId', context.user.id)
      .where('read', false)
      .where('createdAt', { $lte: latestNotification.createdAt })
      .exec();

    const idsToUpdate: string[] = notificationsToUpdate.map(
      notification => notification._id,
    );

    await context.mongoose.models.Notification.updateMany(
      { _id: { $in: idsToUpdate } },
      { read: true },
    ).exec();

    return context.mongoose.models.Notification.find()
      .where({ _id: { $in: idsToUpdate } })
      .exec();
  },

  markNotificationsAsReadForDispute: async (parent, { disputeId }, context) => {
    if (!context.user) {
      throw new AuthenticationError('not authenticated');
    }

    const messagesOfTheDispute: {
      disputes: {
        messages: {
          _id: string;
        };
      };
    }[] = await context.mongoose.models.Subject.aggregate()
      .unwind('disputes')
      .unwind('disputes.messages')
      .match({ 'disputes._id': mongoose.Types.ObjectId(disputeId) })
      .project('disputes.messages._id')
      .exec();

    const messageIdsOfTheDispute = messagesOfTheDispute.map(
      subject => subject.disputes.messages._id,
    );

    const notificationsToUpdate = await context.mongoose.models.Notification.find()
      .select('_id')
      .or([
        { messageId: { $in: messageIdsOfTheDispute } },
        { disputeId: mongoose.Types.ObjectId(disputeId) },
      ])
      .where('read', false)
      .where('userId', context.user.id)
      .exec();

    if (notificationsToUpdate.length === 0) {
      return {
        updatedNotifications: [],
      };
    }

    const idsToUpdate: string[] = notificationsToUpdate.map(
      notification => notification._id,
    );

    await context.mongoose.models.Notification.updateMany(
      { _id: { $in: idsToUpdate } },
      { read: true },
    ).exec();

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const updatedNotifications: (
      | NewDisputeNotificationDocument
      | NewMessageNotificationDocument
    )[] = await context.mongoose.models.Notification.find()
      .where({ _id: { $in: idsToUpdate } })
      .exec();

    return { updatedNotifications };
  },
};

export default notificationMutations;

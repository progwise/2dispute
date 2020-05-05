import * as mongoose from 'mongoose';

export interface NotificationDocument extends mongoose.Document {
  createdAt: Date;
  userId: string;
  read: boolean;
  type: 'NewDisputeNotification' | 'NewMessageNotification';
}

export interface NewDisputeNotificationDocument extends NotificationDocument {
  disputeId: string;
  type: 'NewDisputeNotification';
}

export interface NewMessageNotificationDocument extends NotificationDocument {
  messageId: string;
  type: 'NewMessageNotification';
}

export const notificationSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, required: true, default: Date.now, index: true },
    userId: { type: String, required: true, index: true },
    read: { type: Boolean, required: true, default: false },
    type: { type: String, required: true },
  },
  { collection: 'notifications', discriminatorKey: 'type' },
);

export const newDisputeNotificationSchema = new mongoose.Schema({
  disputeId: { type: mongoose.Types.ObjectId },
});

export const newMessageNotificationSchema = new mongoose.Schema({
  messageId: { type: mongoose.Types.ObjectId },
});

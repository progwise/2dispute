import mongoose from 'mongoose';
import { dispute1 } from './subjects';

export const newDisputeNotification1 = {
  _id: mongoose.Types.ObjectId('7d668f7e0c27b5a7efb389d1'),
  createdAt: new Date('2020-06-15T10:00:00.000Z'),
  read: false,
  type: 'NewDisputeNotification',
  disputeId: dispute1._id.toHexString(),
  userId: 'twitterId',
};

export const newDisputeNotification2 = {
  _id: mongoose.Types.ObjectId('21e9e3abe71bfca0d079b28e'),
  createdAt: new Date('2020-06-14T10:00:00.000Z'),
  read: false,
  type: 'NewDisputeNotification',
  disputeId: dispute1._id.toHexString(),
  userId: 'twitterId',
};

export const newDisputeNotification3 = {
  _id: mongoose.Types.ObjectId('c5371677b5fe86660b8c0399'),
  createdAt: new Date('2020-06-16T10:00:00.000Z'),
  read: false,
  type: 'NewDisputeNotification',
  disputeId: dispute1._id.toHexString(),
  userId: 'twitterId',
};

export const newMessageNotification = {
  _id: mongoose.Types.ObjectId('76223877c0e3358899de3439'),
  createdAt: new Date('2020-06-15T10:00:00.000Z'),
  read: true,
  type: 'NewMessageNotification',
  messageId: dispute1.messages[1]._id.toHexString(),
  userId: 'twitterId',
};

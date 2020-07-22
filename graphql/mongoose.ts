import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import SubjectSchema, { SubjectDocument } from './Subject/SubjectSchema';
import {
  NotificationDocument,
  notificationSchema,
  NewDisputeNotificationDocument,
  newDisputeNotificationSchema,
  NewMessageNotificationDocument,
  newMessageNotificationSchema,
} from './Notification/NotificationSchema';
import UserSchema, { UserDocument } from './User/UserSchema';
import CacheManagerSchema, {
  CacheManagerDocument,
} from './User/CacheManagerSchema';

mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export interface MongooseHelper {
  connection: mongoose.Connection;
  models: {
    Subject: mongoose.Model<SubjectDocument, {}>;
    Notification: mongoose.Model<NotificationDocument, {}>;
    NewDisputeNotification: mongoose.Model<NewDisputeNotificationDocument, {}>;
    NewMessageNotification: mongoose.Model<NewMessageNotificationDocument, {}>;
    User: mongoose.Model<UserDocument, {}>;
    CacheManager: mongoose.Model<CacheManagerDocument, {}>;
  };
}

export interface MyNextApiRequest extends NextApiRequest {
  mongoose: MongooseHelper;
}

export const getMongooseHelper = async (): Promise<MongooseHelper> => {
  const isMongoConnected = mongoose.connections[0].readyState === 1;

  if (!isMongoConnected) {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING ?? '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const Subject: mongoose.Model<SubjectDocument, {}> =
    mongoose.models.Subject ??
    mongoose.model<SubjectDocument>('Subject', SubjectSchema);
  const Notification: mongoose.Model<NotificationDocument, {}> =
    mongoose.models.Notification ??
    mongoose.model<NotificationDocument>('Notification', notificationSchema);
  const NewDisputeNotification: mongoose.Model<
    NewDisputeNotificationDocument,
    {}
  > =
    mongoose.models.NewDisputeNotification ??
    Notification.discriminator<NewDisputeNotificationDocument>(
      'NewDisputeNotification',
      newDisputeNotificationSchema,
    );
  const NewMessageNotification: mongoose.Model<
    NewMessageNotificationDocument,
    {}
  > =
    mongoose.models.NewMessageNotification ??
    Notification.discriminator<NewMessageNotificationDocument>(
      'NewMessageNotification',
      newMessageNotificationSchema,
    );
  const User: mongoose.Model<UserDocument, {}> =
    mongoose.models.User ?? mongoose.model<UserDocument>('User', UserSchema);
  const CacheManager: mongoose.Model<CacheManagerDocument, {}> =
    mongoose.models.CacheManager ??
    mongoose.model<CacheManagerDocument>('CacheManager', CacheManagerSchema);

  return {
    connection: mongoose.connections[0],
    models: {
      Subject,
      Notification,
      NewDisputeNotification,
      NewMessageNotification,
      User,
      CacheManager,
    },
  };
};

export const closeConnection = (): Promise<void> => {
  const isMongoConnected = mongoose.connections[0].readyState === 1;

  if (!isMongoConnected) {
    return Promise.resolve();
  }

  return mongoose.connections[0].close();
};

const mongooseMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const mongoose = await getMongooseHelper();
  const customReq: MyNextApiRequest = Object.assign(req, { mongoose });

  return handler(customReq, res);
};

export default mongooseMiddleware;

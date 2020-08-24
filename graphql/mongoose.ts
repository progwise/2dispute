import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import SubjectSchema, { SubjectDocument } from './Subject/SubjectSchema';
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
  const User: mongoose.Model<UserDocument, {}> =
    mongoose.models.User ?? mongoose.model<UserDocument>('User', UserSchema);
  const CacheManager: mongoose.Model<CacheManagerDocument, {}> =
    mongoose.models.CacheManager ??
    mongoose.model<CacheManagerDocument>('CacheManager', CacheManagerSchema);

  return {
    connection: mongoose.connections[0],
    models: {
      Subject,
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

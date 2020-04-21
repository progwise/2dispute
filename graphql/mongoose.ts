import * as mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import SubjectSchema, { SubjectDocument } from './Subject/SubjectSchema';

mongoose.set('debug', process.env.NODE_ENV === 'development');

export interface MongooseHelper {
  connection: mongoose.Connection;
  models: {
    Subject: mongoose.Model<SubjectDocument, {}>;
  };
}

export interface MyNextApiRequest extends NextApiRequest {
  mongoose: MongooseHelper;
}

const connectToMongo = async (): Promise<MongooseHelper> => {
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

  return {
    connection: mongoose.connections[0],
    models: {
      Subject,
    },
  };
};

const mongooseMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const mongoose = await connectToMongo();
  const customReq: MyNextApiRequest = Object.assign(req, { mongoose });

  return handler(customReq, res);
};

export default mongooseMiddleware;

import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  twitterId: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    twitterId: { type: String, required: true, index: true },
  },
  { collection: 'users' },
);

export default UserSchema;

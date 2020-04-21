import * as mongoose from 'mongoose';
import DisputeSchema, { DisputeDocument } from '../Dispute/DisputeSchema';

export interface SubjectDocument extends mongoose.Document {
  subject: string;
  tweetId?: string;
  userId: string;
  firstMessage: string;
  disputes: DisputeDocument[];
  createdAt: Date;
}

const SubjectSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    tweetId: String,
    userId: { type: String, required: true },
    firstMessage: { type: String, required: true },
    disputes: { type: [DisputeSchema], required: true },
    createdAt: { type: Date, required: true },
  },
  { collection: 'subjects' },
);

export default SubjectSchema;

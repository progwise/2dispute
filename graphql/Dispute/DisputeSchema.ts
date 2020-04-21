import * as mongoose from 'mongoose';
import MessageSchema, { MessageDocument } from '../Message/MessageSchema';

export interface DisputeDocument {
  _id: mongoose.Types.ObjectId;
  partnerIdA: string;
  partnerIdB: string;
  messages: MessageDocument[];
  createdAt: Date;
}

const DisputeSchema = new mongoose.Schema({
  partnerIdA: { type: String, required: true },
  partnerIdB: { type: String, required: true },
  messages: { type: [MessageSchema], required: true },
  createdAt: { type: Date, required: true },
});

export default DisputeSchema;

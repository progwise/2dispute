import * as mongoose from 'mongoose';

export interface MessageDocument {
  _id: mongoose.Types.ObjectId;
  authorId: string;
  text: string;
  createdAt: Date;
  upVoters: string[];
  downVoters: string[];
}

const MessageSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true },
  upVoters: { type: [String], required: true, default: [] },
  downVoters: { type: [String], required: true, default: [] },
});

export default MessageSchema;

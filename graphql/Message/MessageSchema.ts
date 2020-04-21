import * as mongoose from 'mongoose';

export interface MessageDocument {
  _id: mongoose.Types.ObjectId;
  authorId: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default MessageSchema;

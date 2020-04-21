import * as mongoose from 'mongoose';

export interface MessageDocument {
  _id: mongoose.Types.ObjectId;
  authorId: string;
  text: string;
}

const MessageSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  text: { type: String, required: true },
});

export default MessageSchema;

import mongoose from 'mongoose';

export interface CacheManagerDocument extends mongoose.Document {
  key: string;
  expire: Date;
  value: object;
}

const CacheManagerSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    expire: { type: Date, required: true },
    value: { type: Object, required: true },
  },
  { collection: 'cacheManager' },
);

export default CacheManagerSchema;

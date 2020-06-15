import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing' });

// Use the mongodb url from https://github.com/shelfio/jest-mongodb
process.env.MONGODB_CONNECTION_STRING = process.env.MONGO_URL;

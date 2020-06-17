import cacheManager from 'cache-manager';
import mongoStore from 'cache-manager-mongodb';
import fetchTwitterUser from './fetchTwitterUser';
import { UserMapper } from '.';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export const mongoCache = cacheManager.caching({
  store: mongoStore,
  uri: process.env.MONGODB_CONNECTION_STRING,
  options: {
    collection: 'cacheManager',
    compression: false,
    poolSize: 5,
    useUnifiedTopology: true,
  },
});

const getTwitterUserById = (userId: string): Promise<UserMapper> => {
  const key = `twitter_user_${userId}`;
  return mongoCache.wrap<UserMapper>(key, () => fetchTwitterUser(userId), {
    ttl: 60 * 60 * 24 /* 24 hours */,
  });
};

export default getTwitterUserById;

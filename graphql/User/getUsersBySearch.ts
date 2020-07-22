// eslint-disable-next-line import/default
import escapeStringRegexp from 'escape-string-regexp';
import { MongooseHelper } from '../mongoose';
import { UserMapper } from '.';

const getUsersBySearch = async (
  search: string,
  mongoose: MongooseHelper,
): Promise<UserMapper[]> => {
  const searchRegex = new RegExp(escapeStringRegexp(search), 'i');

  const cacheItems = await mongoose.models.CacheManager.find()
    .where({ key: /^twitter_user_\w+$/ })
    .or([{ 'value.name': searchRegex }, { 'value.twitterHandle': searchRegex }])
    .limit(50)
    .exec();

  return cacheItems.map(cacheItem => cacheItem.value as UserMapper);
};

export default getUsersBySearch;

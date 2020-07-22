// eslint-disable-next-line import/default
import escapeStringRegexp from 'escape-string-regexp';
import { MongooseHelper } from '../mongoose';
import { UserMapper } from '.';

const getSearchConditions = (search: string): object[] => {
  if (search.startsWith('@')) {
    const searchWithoutAtSign = search.slice(1);
    const twitterHandleRegex = new RegExp(
      `^${escapeStringRegexp(searchWithoutAtSign)}`,
      'i',
    );
    return [{ 'value.twitterHandle': twitterHandleRegex }];
  }

  const searchRegex = new RegExp(escapeStringRegexp(search), 'i');
  return [
    { 'value.name': searchRegex },
    { 'value.twitterHandle': searchRegex },
  ];
};

const getUsersBySearch = async (
  search: string,
  mongoose: MongooseHelper,
): Promise<UserMapper[]> => {
  const searchConditions = getSearchConditions(search);
  const cacheItems = await mongoose.models.CacheManager.find()
    .where({ key: /^twitter_user_\w+$/ })
    .or(searchConditions)
    .limit(50)
    .exec();

  return cacheItems.map(cacheItem => cacheItem.value as UserMapper);
};

export default getUsersBySearch;

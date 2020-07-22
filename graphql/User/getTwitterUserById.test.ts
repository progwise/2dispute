/* eslint-disable @typescript-eslint/camelcase */

import Twitter from 'twitter-lite';
import { MongoClient } from 'mongodb';
import getTwitterUserById, { mongoCache } from './getTwitterUserById';

jest.mock('twitter-lite');
const TwitterMock = (Twitter as unknown) as jest.Mock;

// The cache-manager-mongodb (https://github.com/v4l3r10/node-cache-manager-mongodb)
// does not provide a method to close the mongodb connection or to access the
// connection instance. Therefore the mongodb module gets mocked to access the
// connection instance and to close it after all test.
let mongoConnection: MongoClient;
jest.mock('mongodb', () => ({
  MongoClient: {
    connect: async (...args): Promise<MongoClient> => {
      const Mongo = jest.requireActual('mongodb');
      const connection = await Mongo.MongoClient.connect(...args);
      mongoConnection = connection;
      return connection;
    },
  },
}));

const getBearerToken = jest.fn();
const get = jest.fn();

beforeEach(() => {
  // Prepare mocks:
  getBearerToken.mockResolvedValue({
    token_type: 'bearer',
    access_token: 'access_token',
  });
  get.mockResolvedValue({
    name: 'user name',
    profile_image_url_https:
      'https://pbs.twimg.com/profile_images/942858479592554497/BbazLO9L_normal.jpg',
    screen_name: 'twitterHandle',
  });
  TwitterMock.mockReturnValue({ getBearerToken, get });
});

afterEach(async () => {
  jest.resetAllMocks();
  await mongoCache.reset();
});

afterAll(() => mongoConnection.close());

test('load user from twitter when calling an id for the first time', async () => {
  const user = await getTwitterUserById('userId');

  expect(user).toEqual({
    id: 'userId',
    name: 'user name',
    twitterHandle: 'twitterHandle',
    picture:
      'https://pbs.twimg.com/profile_images/942858479592554497/BbazLO9L_200x200.jpg',
  });

  expect(TwitterMock).toBeCalledTimes(2);
  expect(TwitterMock).nthCalledWith(1, {
    consumer_key: 'TWITTER_CONSUMER_KEY',
    consumer_secret: 'TWITTER_CONSUMER_SECRET',
  });
  expect(TwitterMock).nthCalledWith(2, {
    bearer_token: 'access_token',
  });

  expect(getBearerToken).toBeCalledTimes(1);

  expect(get).toBeCalledTimes(1);
  expect(get).toBeCalledWith('users/show', {
    user_id: 'userId',
    include_entities: false,
  });
});

test('load user from cache when called a second time', async () => {
  const userFirstLoad = await getTwitterUserById('userId');
  const userSecondLoad = await getTwitterUserById('userId');

  const expectedResult = {
    id: 'userId',
    name: 'user name',
    twitterHandle: 'twitterHandle',
    picture:
      'https://pbs.twimg.com/profile_images/942858479592554497/BbazLO9L_200x200.jpg',
  };
  expect(userFirstLoad).toEqual(expectedResult);
  expect(userSecondLoad).toEqual(expectedResult);
  expect(get).toBeCalledTimes(1);
});

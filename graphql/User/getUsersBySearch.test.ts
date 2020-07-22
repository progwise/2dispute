import {
  getMongooseHelper,
  closeConnection,
  MongooseHelper,
} from '../mongoose';
import { user1 } from '../../testing/fixtures/cacheManager';
import getUsersBySearch from './getUsersBySearch';

let mongoose: MongooseHelper;

beforeAll(async () => {
  mongoose = await getMongooseHelper();
});

beforeEach(() => new mongoose.models.CacheManager(user1).save());

afterEach(() => mongoose.models.CacheManager.deleteMany({}).exec());

afterAll(() => closeConnection());

test('returns empty array if nothing matches', async () => {
  const users = await getUsersBySearch('notExistingUser', mongoose);
  expect(users).toHaveLength(0);
});

test('search by twitter name', async () => {
  const users = await getUsersBySearch('user Nam', mongoose);

  expect(users).toHaveLength(1);
  expect(users).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "1",
        "name": "User name",
        "picture": null,
        "twitterHandle": "twitterHandle",
      },
    ]
  `);
});

test('search by twitter handle', async () => {
  const users = await getUsersBySearch('handle', mongoose);

  expect(users).toHaveLength(1);
  expect(users).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "1",
        "name": "User name",
        "picture": null,
        "twitterHandle": "twitterHandle",
      },
    ]
  `);
});

test('escape regex', async () => {
  const users = await getUsersBySearch('.', mongoose);
  expect(users).toHaveLength(0);
});

import http from 'http';
import request from 'supertest';
import createTestServer from '../../utils/testing/createTestServer';
import {
  closeConnection,
  getMongooseHelper,
  MongooseHelper,
} from '../mongoose';
import { subject1 } from '../../testing/fixtures/subjects';
import { getTwitterUserById } from '../User';

jest.mock('../User/getTwitterUserById');
const mockedGetTwitterUserById = (getTwitterUserById as unknown) as jest.Mock;

let app: http.Server;
let mongoose: MongooseHelper;

beforeAll(async () => {
  app = createTestServer();
  mongoose = await getMongooseHelper();
});

afterAll(async () => {
  await closeConnection();
  app.close();
});

afterEach(async () => {
  await mongoose.models.Subject.deleteMany({}).exec();
  jest.resetAllMocks();
});

test('Message type resolves correctly', async () => {
  mockedGetTwitterUserById.mockImplementation(id => ({
    id,
    name: `User ${id}`,
  }));

  await new mongoose.models.Subject(subject1).save();

  const disputeQuery = `
    {
      dispute(id: "bbaeec62fed1fe8eff4bc127") {
        messages {
          id
          text
          dispute {
            id
          }
          votes {
            ups
            downs
            userVoting
          }
          author {
            id
            name
          }
        }
      }
    }
  `;

  const result = await request(app)
    .post('')
    .send({ query: disputeQuery })
    .expect(200);

  expect(result.body.errors).toBeUndefined();
  expect(result.body.data).toMatchInlineSnapshot(`
    Object {
      "dispute": Object {
        "messages": Array [
          Object {
            "author": Object {
              "id": "1",
              "name": "User 1",
            },
            "dispute": Object {
              "id": "bbaeec62fed1fe8eff4bc127",
            },
            "id": "7b6429574939a24fde1b7cb0",
            "text": "In my opinion",
            "votes": Object {
              "downs": 0,
              "ups": 0,
              "userVoting": "NONE",
            },
          },
          Object {
            "author": Object {
              "id": "2",
              "name": "User 2",
            },
            "dispute": Object {
              "id": "bbaeec62fed1fe8eff4bc127",
            },
            "id": "33c6dd9d4571877fdb4baa0c",
            "text": "reply message",
            "votes": Object {
              "downs": 0,
              "ups": 0,
              "userVoting": "NONE",
            },
          },
        ],
      },
    }
  `);
});

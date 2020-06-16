/* eslint-disable @typescript-eslint/camelcase */

import http from 'http';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import createTestServer from '../../utils/testing/createTestServer';
import {
  closeConnection,
  getMongooseHelper,
  MongooseHelper,
} from '../mongoose';
import getTwitterUserById from '../User/getTwitterUserById';

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

beforeEach(async () => {
  await mongoose.models.Subject.deleteMany({}).exec();
  jest.resetAllMocks();
});

describe('createSubject mutation', () => {
  const createSubjectMutation = `
    mutation {
      createSubject(
        input: {
          subject: "New Subject"
          firstMessage: "first message"
          tweetId: "https://twitter.com/jack/status/20"
        }
      ) {
        subject
        tweetId
        firstMessage {
          text
        }
        author {
          id
          name
        }
      }
    }
  `;

  test('unauthorized mutation', async () => {
    const result = await request(app)
      .post('')
      .send({ query: createSubjectMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  test('successful createSubject mutation', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: '1',
      name: 'User 1',
    });

    const user = {
      twitterId: 'twitterId',
      accessToken: {
        oauth_token: 'oauth_token',
        oauth_token_secret: 'oauth_token_secret',
      },
    };
    const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: createSubjectMutation })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "createSubject": Object {
            "author": Object {
              "id": "1",
              "name": "User 1",
            },
            "firstMessage": Object {
              "text": "first message",
            },
            "subject": "New Subject",
            "tweetId": "https://twitter.com/jack/status/20",
          },
        },
      }
    `);
  });
});

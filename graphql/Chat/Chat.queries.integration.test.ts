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
import { subject3, subject1 } from '../../testing/fixtures/subjects';

let app: http.Server;
let mongoose: MongooseHelper;

const user = {
  twitterId: '1',
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

beforeAll(async () => {
  app = createTestServer();
  mongoose = await getMongooseHelper();
});

afterAll(async () => {
  await closeConnection();
  app.close();
});

beforeEach(async () => mongoose.models.Subject.deleteMany({}).exec());

describe('query chat', () => {
  const chatQuery = `
    {
      chat {
        items {
          id
          lastMessageAt
        }
      }
    }
  `;

  test('returns null when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: chatQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "chat": null,
        },
      }
    `);
  });

  test('returns empty array when user does not participate in a dispute', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: chatQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "chat": Object {
            "items": Array [],
          },
        },
      }
    `);
  });

  test('returns one dispute when user does only participate in that dispute', async () => {
    await new mongoose.models.Subject(subject3).save();

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: chatQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "chat": Object {
            "items": Array [
              Object {
                "id": "dc938ae30aab50b2e75c70e6",
                "lastMessageAt": "2020-06-17T11:00:00.000Z",
              },
            ],
          },
        },
      }
    `);
  });

  test('returns disputes sorted by last message', async () => {
    await new mongoose.models.Subject(subject1).save();
    await new mongoose.models.Subject(subject3).save();

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: chatQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "chat": Object {
            "items": Array [
              Object {
                "id": "dc938ae30aab50b2e75c70e6",
                "lastMessageAt": "2020-06-17T11:00:00.000Z",
              },
              Object {
                "id": "a17456a1410c7fb7ed325372",
                "lastMessageAt": "2020-06-15T11:00:00.000Z",
              },
              Object {
                "id": "bbaeec62fed1fe8eff4bc127",
                "lastMessageAt": "2020-06-15T10:00:00.000Z",
              },
            ],
          },
        },
      }
    `);
  });
});

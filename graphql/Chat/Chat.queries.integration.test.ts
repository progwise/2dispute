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
        newestLastMessageAt
        oldestLastMessageAt
        hasNextPage
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
            "hasNextPage": false,
            "items": Array [],
            "newestLastMessageAt": null,
            "oldestLastMessageAt": null,
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
            "hasNextPage": false,
            "items": Array [
              Object {
                "id": "dc938ae30aab50b2e75c70e6",
                "lastMessageAt": "2020-06-17T11:00:00.000Z",
              },
            ],
            "newestLastMessageAt": "2020-06-17T11:00:00.000Z",
            "oldestLastMessageAt": "2020-06-17T11:00:00.000Z",
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
            "hasNextPage": false,
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
            "newestLastMessageAt": "2020-06-17T11:00:00.000Z",
            "oldestLastMessageAt": "2020-06-15T10:00:00.000Z",
          },
        },
      }
    `);
  });

  describe('arguments', () => {
    test('limit argument', async () => {
      await new mongoose.models.Subject(subject1).save();
      await new mongoose.models.Subject(subject3).save();

      const chatQueryWithLimit = `
        {
          chat(limit: 1) {
            hasNextPage
            items {
              id
            }
            newestLastMessageAt
            oldestLastMessageAt
          }
        }
      `;

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: chatQueryWithLimit })
        .expect(200);

      expect(result.body.data.chat.items).toHaveLength(1);
      expect(result.body.data.chat.hasNextPage).toBeTruthy();
    });

    test('before argument', async () => {
      await new mongoose.models.Subject(subject1).save();
      await new mongoose.models.Subject(subject3).save();

      const chatQueryWithBefore = `
        {
          chat(before: "2020-06-15T10:00:00.000Z") {
            items {
              id
              lastMessageAt
            }
            newestLastMessageAt
            oldestLastMessageAt
            hasNextPage
          }
        }
      `;

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: chatQueryWithBefore })
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "chat": Object {
              "hasNextPage": false,
              "items": Array [
                Object {
                  "id": "dc938ae30aab50b2e75c70e6",
                  "lastMessageAt": "2020-06-17T11:00:00.000Z",
                },
                Object {
                  "id": "a17456a1410c7fb7ed325372",
                  "lastMessageAt": "2020-06-15T11:00:00.000Z",
                },
              ],
              "newestLastMessageAt": "2020-06-17T11:00:00.000Z",
              "oldestLastMessageAt": "2020-06-15T11:00:00.000Z",
            },
          },
        }
      `);
    });

    test('after argument', async () => {
      await new mongoose.models.Subject(subject1).save();
      await new mongoose.models.Subject(subject3).save();

      const chatQueryWithAfter = `
        {
          chat(after: "2020-06-15T11:00:00.000Z") {
            items {
              id
              lastMessageAt
            }
            newestLastMessageAt
            oldestLastMessageAt
            hasNextPage
          }
        }
      `;

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: chatQueryWithAfter })
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "chat": Object {
              "hasNextPage": false,
              "items": Array [
                Object {
                  "id": "bbaeec62fed1fe8eff4bc127",
                  "lastMessageAt": "2020-06-15T10:00:00.000Z",
                },
              ],
              "newestLastMessageAt": "2020-06-15T10:00:00.000Z",
              "oldestLastMessageAt": "2020-06-15T10:00:00.000Z",
            },
          },
        }
      `);
    });

    describe('search argument', () => {
      test('regular search', async () => {
        await new mongoose.models.Subject(subject1).save();
        await new mongoose.models.Subject(subject3).save();

        const chatQueryWithSearch = `
          {
            chat(search: "TESTSUBJECT") {
              items {
                id
                subject {
                  subject
                }
              }
              newestLastMessageAt
              oldestLastMessageAt
              hasNextPage
            }
          }
        `;

        const result = await request(app)
          .post('')
          .set('Cookie', [`token=${token}`])
          .send({ query: chatQueryWithSearch })
          .expect(200);

        expect(result.body).toMatchInlineSnapshot(`
          Object {
            "data": Object {
              "chat": Object {
                "hasNextPage": false,
                "items": Array [
                  Object {
                    "id": "a17456a1410c7fb7ed325372",
                    "subject": Object {
                      "subject": "testSubject",
                    },
                  },
                  Object {
                    "id": "bbaeec62fed1fe8eff4bc127",
                    "subject": Object {
                      "subject": "testSubject",
                    },
                  },
                ],
                "newestLastMessageAt": "2020-06-15T11:00:00.000Z",
                "oldestLastMessageAt": "2020-06-15T10:00:00.000Z",
              },
            },
          }
        `);
      });

      test('escape regex expression', async () => {
        await new mongoose.models.Subject(subject1).save();

        const chatQueryWithSearch = `
          {
            chat(search: ".") {
              items {
                id
              }
            }
          }
        `;

        const result = await request(app)
          .post('')
          .set('Cookie', [`token=${token}`])
          .send({ query: chatQueryWithSearch })
          .expect(200);

        expect(result.body.errors).toBeUndefined();
        expect(result.body.data.chat.items).toHaveLength(0);
      });
    });
  });
});

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
import { subject1, subject3, subject4 } from '../../testing/fixtures/subjects';
import { user1 } from '../../testing/fixtures/cacheManager';

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

beforeEach(() =>
  Promise.all([
    mongoose.models.Subject.deleteMany({}).exec(),
    mongoose.models.CacheManager.deleteMany({}).exec(),
  ]),
);

describe('query chat', () => {
  const chatQuery = `
    {
      chat(scope: USER_SCOPE) {
        edges{
          cursor
          node {
            id
            lastUpdateAt
            __typename
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  `;

  describe('unauthenticated', () => {
    test('returns null when unauthenticated and scope arg is "USER_SCOPE"', async () => {
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

    test('returns array of chat items when unauthenticated and scope arg is "ALL"', async () => {
      const chatQueryAllScope = `
        {
          chat(scope: ALL) {
            edges{
              node {
                id
              }
            }
          }
        }
      `;

      const result = await request(app)
        .post('')
        .send({ query: chatQueryAllScope })
        .expect(200);

      expect(result.body.errors).toBeUndefined();
      expect(result.body.data.chat).toEqual({ edges: [] });
    });
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
            "edges": Array [],
            "pageInfo": Object {
              "endCursor": "",
              "hasNextPage": false,
              "startCursor": "",
            },
          },
        },
      }
    `);
  });

  test('returns one dispute and one subject when user does only participate in that dispute', async () => {
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
            "edges": Array [
              Object {
                "cursor": "2020-06-17T11:00:00.000Z",
                "node": Object {
                  "__typename": "Dispute",
                  "id": "dc938ae30aab50b2e75c70e6",
                  "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                },
              },
              Object {
                "cursor": "2020-06-17T11:00:00.000Z",
                "node": Object {
                  "__typename": "Subject",
                  "id": "5021abebf3312244c2aeb762",
                  "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "2020-06-17T11:00:00.000Z",
              "hasNextPage": false,
              "startCursor": "2020-06-17T11:00:00.000Z",
            },
          },
        },
      }
    `);
  });

  test('returns disputes sorted by last update at', async () => {
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
            "edges": Array [
              Object {
                "cursor": "2020-06-17T11:00:00.000Z",
                "node": Object {
                  "__typename": "Dispute",
                  "id": "dc938ae30aab50b2e75c70e6",
                  "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                },
              },
              Object {
                "cursor": "2020-06-17T11:00:00.000Z",
                "node": Object {
                  "__typename": "Subject",
                  "id": "5021abebf3312244c2aeb762",
                  "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                },
              },
              Object {
                "cursor": "2020-06-15T11:00:00.000Z",
                "node": Object {
                  "__typename": "Dispute",
                  "id": "a17456a1410c7fb7ed325372",
                  "lastUpdateAt": "2020-06-15T11:00:00.000Z",
                },
              },
              Object {
                "cursor": "2020-06-15T10:00:00.000Z",
                "node": Object {
                  "__typename": "Dispute",
                  "id": "bbaeec62fed1fe8eff4bc127",
                  "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                },
              },
              Object {
                "cursor": "2020-06-15T10:00:00.000Z",
                "node": Object {
                  "__typename": "Subject",
                  "id": "123456789012345678901234",
                  "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "2020-06-15T10:00:00.000Z",
              "hasNextPage": false,
              "startCursor": "2020-06-17T11:00:00.000Z",
            },
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
            edges{
              node {
                id
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `;

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: chatQueryWithLimit })
        .expect(200);

      expect(result.body.data.chat.edges).toHaveLength(1);
      expect(result.body.data.chat.pageInfo.hasNextPage).toBeTruthy();
    });

    test('before argument', async () => {
      await new mongoose.models.Subject(subject1).save();
      await new mongoose.models.Subject(subject3).save();

      const chatQueryWithBefore = `
        {
          chat(before: "2020-06-15T10:00:00.000Z") {
            edges{
              node {
                id
                lastUpdateAt
                __typename
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
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
              "edges": Array [
                Object {
                  "node": Object {
                    "__typename": "Dispute",
                    "id": "dc938ae30aab50b2e75c70e6",
                    "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                  },
                },
                Object {
                  "node": Object {
                    "__typename": "Subject",
                    "id": "5021abebf3312244c2aeb762",
                    "lastUpdateAt": "2020-06-17T11:00:00.000Z",
                  },
                },
                Object {
                  "node": Object {
                    "__typename": "Dispute",
                    "id": "a17456a1410c7fb7ed325372",
                    "lastUpdateAt": "2020-06-15T11:00:00.000Z",
                  },
                },
              ],
              "pageInfo": Object {
                "endCursor": "2020-06-15T11:00:00.000Z",
                "hasNextPage": false,
                "startCursor": "2020-06-17T11:00:00.000Z",
              },
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
            edges{
              node {
                id
                lastUpdateAt
                __typename
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
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
              "edges": Array [
                Object {
                  "node": Object {
                    "__typename": "Dispute",
                    "id": "bbaeec62fed1fe8eff4bc127",
                    "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                  },
                },
                Object {
                  "node": Object {
                    "__typename": "Subject",
                    "id": "123456789012345678901234",
                    "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                  },
                },
              ],
              "pageInfo": Object {
                "endCursor": "2020-06-15T10:00:00.000Z",
                "hasNextPage": false,
                "startCursor": "2020-06-15T10:00:00.000Z",
              },
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
              edges{
                node {
                  id
                  lastUpdateAt
                  __typename
                  ... on Dispute {
                    connectedSubject: subject {
                      subject
                    }
                  }
                  ... on Subject {
                    subject
                  }
                }
              }
              pageInfo {
                startCursor
                endCursor
                hasNextPage
              }
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
                "edges": Array [
                  Object {
                    "node": Object {
                      "__typename": "Dispute",
                      "connectedSubject": Object {
                        "subject": "testSubject",
                      },
                      "id": "a17456a1410c7fb7ed325372",
                      "lastUpdateAt": "2020-06-15T11:00:00.000Z",
                    },
                  },
                  Object {
                    "node": Object {
                      "__typename": "Dispute",
                      "connectedSubject": Object {
                        "subject": "testSubject",
                      },
                      "id": "bbaeec62fed1fe8eff4bc127",
                      "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                    },
                  },
                  Object {
                    "node": Object {
                      "__typename": "Subject",
                      "id": "123456789012345678901234",
                      "lastUpdateAt": "2020-06-15T10:00:00.000Z",
                      "subject": "testSubject",
                    },
                  },
                ],
                "pageInfo": Object {
                  "endCursor": "2020-06-15T10:00:00.000Z",
                  "hasNextPage": false,
                  "startCursor": "2020-06-15T11:00:00.000Z",
                },
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
              edges {
                node {
                  ... on Dispute {
                    id
                  }
                }
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
        expect(result.body.data.chat.edges).toHaveLength(0);
      });

      test('search by twitter name', async () => {
        await Promise.all([
          new mongoose.models.Subject(subject3).save(),
          new mongoose.models.CacheManager(user1).save(),
        ]);

        const chatQueryWithSearch = `
          {
            chat(search: "user name") {
              edges {
                node {
                  id
                  __typename
                }
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
        expect(result.body.data.chat.edges).toHaveLength(2);
        expect(result.body.data.chat.edges).toMatchInlineSnapshot(`
          Array [
            Object {
              "node": Object {
                "__typename": "Dispute",
                "id": "dc938ae30aab50b2e75c70e6",
              },
            },
            Object {
              "node": Object {
                "__typename": "Subject",
                "id": "5021abebf3312244c2aeb762",
              },
            },
          ]
        `);
      });
    });

    describe('scope argument', () => {
      beforeEach(() =>
        Promise.all([
          new mongoose.models.Subject(subject3).save(),
          new mongoose.models.Subject(subject4).save(),
        ]),
      );

      test('on user scope only return user related chat items', async () => {
        const chatQueryWithSearch = `
          {
            chat(scope: USER_SCOPE) {
              edges {
                node {
                  id
                  __typename
                }
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
        expect(result.body.data.chat.edges).toMatchInlineSnapshot(`
          Array [
            Object {
              "node": Object {
                "__typename": "Dispute",
                "id": "dc938ae30aab50b2e75c70e6",
              },
            },
            Object {
              "node": Object {
                "__typename": "Subject",
                "id": "5021abebf3312244c2aeb762",
              },
            },
          ]
        `);
      });

      test('on all scope only return all related chat items', async () => {
        const chatQueryWithSearch = `
          {
            chat(scope: ALL) {
              edges {
                node {
                  id
                  __typename
                }
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
        expect(result.body.data.chat.edges).toMatchInlineSnapshot(`
          Array [
            Object {
              "node": Object {
                "__typename": "Dispute",
                "id": "5590801ae7b5bc7f82f3754d",
              },
            },
            Object {
              "node": Object {
                "__typename": "Subject",
                "id": "4ee55ac0d26d7b37c0b08284",
              },
            },
            Object {
              "node": Object {
                "__typename": "Dispute",
                "id": "dc938ae30aab50b2e75c70e6",
              },
            },
            Object {
              "node": Object {
                "__typename": "Subject",
                "id": "5021abebf3312244c2aeb762",
              },
            },
          ]
        `);
      });
    });
  });
});

describe('query chatItem', () => {
  test('returns null when chatItem not exists', async () => {
    const chatItemQuery = `
      {
        chatItem(id: "not existing id") {
          __typename
          id
          lastUpdateAt
        }
      }
    `;

    const result = await request(app)
      .post('')
      .send({ query: chatItemQuery })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.chatItem).toBeNull();
  });

  test('returns a subject when passing a subject id', async () => {
    await new mongoose.models.Subject(subject3).save();

    const chatItemQuery = `
      {
        chatItem(id: "5021abebf3312244c2aeb762") {
          __typename
          id
          lastUpdateAt
        }
      }
    `;

    const result = await request(app)
      .post('')
      .send({ query: chatItemQuery })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "chatItem": Object {
          "__typename": "Subject",
          "id": "5021abebf3312244c2aeb762",
          "lastUpdateAt": "2020-06-17T11:00:00.000Z",
        },
      }
    `);
  });

  test('returns a dispute when passing a dispute id', async () => {
    await new mongoose.models.Subject(subject3).save();

    const chatItemQuery = `
      {
        chatItem(id: "dc938ae30aab50b2e75c70e6") {
          __typename
          id
          lastUpdateAt
        }
      }
    `;

    const result = await request(app)
      .post('')
      .send({ query: chatItemQuery })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "chatItem": Object {
          "__typename": "Dispute",
          "id": "dc938ae30aab50b2e75c70e6",
          "lastUpdateAt": "2020-06-17T11:00:00.000Z",
        },
      }
    `);
  });
});

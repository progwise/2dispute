/* eslint-disable @typescript-eslint/camelcase */

import http from 'http';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import createTestServer from '../../utils/testing/createTestServer';
import {
  closeConnection,
  getMongooseHelper,
  MongooseHelper,
} from '../mongoose';
import { subject1 } from '../../testing/fixtures/subjects';
import {
  newDisputeNotification,
  newMessageNotification,
} from '../../testing/fixtures/notifications';

let app: http.Server;
let mongoose: MongooseHelper;

beforeAll(async () => {
  app = createTestServer();
  mongoose = await getMongooseHelper();
});

beforeEach(() =>
  Promise.all([
    mongoose.models.Subject.deleteMany({}).exec(),
    mongoose.models.Notification.deleteMany({}).exec(),
  ]),
);

afterAll(async () => {
  await closeConnection();
  app.close();
});

const user = {
  twitterId: 'twitterId',
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

describe('query allNotifications', () => {
  const allNotificationsQuery = `
    {
      allNotifications {
        totalCount
        edges {
          cursor
          node {
            id
            read
            createdAt
            __typename
            ... on NewDisputeNotification {
              dispute {
                id
              }
            }
            ... on NewMessageNotification {
              message {
                id
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  `;

  test('returns null when authenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: allNotificationsQuery })
      .expect(200);

    expect(result.body.data.allNotifications).toBeNull();
    expect(result.body.errors).toBeUndefined();
  });

  test('empty array when no notification exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: allNotificationsQuery })
      .expect(200);

    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "allNotifications": Object {
          "edges": Array [],
          "pageInfo": Object {
            "endCursor": "",
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": "",
          },
          "totalCount": 0,
        },
      }
    `);
    expect(result.body.errors).toBeUndefined();
  });

  test('return array when notifications exist', async () => {
    await Promise.all([
      new mongoose.models.Subject(subject1).save(),
      new mongoose.models.NewDisputeNotification(newDisputeNotification).save(),
      new mongoose.models.NewMessageNotification(newMessageNotification).save(),
    ]);

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: allNotificationsQuery })
      .expect(200);

    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "allNotifications": Object {
          "edges": Array [
            Object {
              "cursor": "NzYyMjM4NzdjMGUzMzU4ODk5ZGUzNDM5",
              "node": Object {
                "__typename": "NewMessageNotification",
                "createdAt": "2020-06-15T10:00:00.000Z",
                "id": "76223877c0e3358899de3439",
                "message": Object {
                  "id": "33c6dd9d4571877fdb4baa0c",
                },
                "read": true,
              },
            },
            Object {
              "cursor": "N2Q2NjhmN2UwYzI3YjVhN2VmYjM4OWQx",
              "node": Object {
                "__typename": "NewDisputeNotification",
                "createdAt": "2020-06-15T10:00:00.000Z",
                "dispute": Object {
                  "id": "bbaeec62fed1fe8eff4bc127",
                },
                "id": "7d668f7e0c27b5a7efb389d1",
                "read": false,
              },
            },
          ],
          "pageInfo": Object {
            "endCursor": "N2Q2NjhmN2UwYzI3YjVhN2VmYjM4OWQx",
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": "NzYyMjM4NzdjMGUzMzU4ODk5ZGUzNDM5",
          },
          "totalCount": 2,
        },
      }
    `);
    expect(result.body.errors).toBeUndefined();
  });
});

describe('query notificationStatus', () => {
  const notificationStatusQuery = `
    {
      notificationStatus {
        totalCountUnread
      }
    }
  `;

  test('fails when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: notificationStatusQuery })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('returns correctly when authenticated', async () => {
    await Promise.all([
      new mongoose.models.Subject(subject1).save(),
      new mongoose.models.NewDisputeNotification(newDisputeNotification).save(),
      new mongoose.models.NewMessageNotification(newMessageNotification).save(),
    ]);

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: notificationStatusQuery })
      .expect(200);

    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "notificationStatus": Object {
          "totalCountUnread": 1,
        },
      }
    `);
    expect(result.body.errors).toBeUndefined();
  });
});

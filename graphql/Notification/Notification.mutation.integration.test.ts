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
  newDisputeNotification1,
  newDisputeNotification2,
  newDisputeNotification3,
  newMessageNotification1,
  newMessageNotification2,
} from '../../testing/fixtures/notifications';
import { NotificationDocument } from './NotificationSchema';

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

describe('mutation markNotificationAsRead', () => {
  const markNotificationAsReadMutation = `
    mutation {
      markNotificationAsRead(id: "7d668f7e0c27b5a7efb389d1") {
        id
        read
      }
    }
  `;

  test('fails when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: markNotificationAsReadMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('fails when notification not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: markNotificationAsReadMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('notification not found');
  });

  describe('successful', () => {
    let result: request.Response;
    let updatedNotification: NotificationDocument | null;

    beforeAll(async () => {
      await Promise.all([
        new mongoose.models.Subject(subject1).save(),
        new mongoose.models.NewDisputeNotification(
          newDisputeNotification1,
        ).save(),
      ]);

      result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: markNotificationAsReadMutation })
        .expect(200);

      updatedNotification = await mongoose.models.Notification.findById(
        '7d668f7e0c27b5a7efb389d1',
      ).exec();
    });

    test('response correctly', () => {
      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "markNotificationAsRead": Object {
            "id": "7d668f7e0c27b5a7efb389d1",
            "read": true,
          },
        }
      `);
    });

    test('updates notification in database correctly', () => {
      expect(updatedNotification).toMatchInlineSnapshot(`
        Object {
          "__v": 0,
          "_id": "7d668f7e0c27b5a7efb389d1",
          "createdAt": 2020-06-15T10:00:00.000Z,
          "disputeId": "bbaeec62fed1fe8eff4bc127",
          "read": true,
          "type": "NewDisputeNotification",
          "userId": "twitterId",
        }
      `);
    });
  });
});

describe('mutation markMultipleNotificationAsRead', () => {
  const markMultipleNotificationAsReadMutation = `
    mutation {
      markMultipleNotificationAsRead(latestId: "7d668f7e0c27b5a7efb389d1") {
        id
        read
      }
    }
  `;

  test('fails when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: markMultipleNotificationAsReadMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('fails when notification not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: markMultipleNotificationAsReadMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('notification not found');
  });

  describe('success', () => {
    let result: request.Response;
    let updatedNotifications: NotificationDocument[];

    beforeAll(async () => {
      await Promise.all([
        new mongoose.models.Subject(subject1).save(),
        new mongoose.models.NewDisputeNotification(
          newDisputeNotification1,
        ).save(),
        new mongoose.models.NewDisputeNotification(
          newDisputeNotification2,
        ).save(),
        new mongoose.models.NewDisputeNotification(
          newDisputeNotification3,
        ).save(),
      ]);

      result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: markMultipleNotificationAsReadMutation })
        .expect(200);

      updatedNotifications = await mongoose.models.Notification.find().exec();
    });

    test('response correctly', () => {
      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "markMultipleNotificationAsRead": Array [
            Object {
              "id": "21e9e3abe71bfca0d079b28e",
              "read": true,
            },
            Object {
              "id": "7d668f7e0c27b5a7efb389d1",
              "read": true,
            },
          ],
        }
      `);
    });

    test('updates notification in database correctly', () => {
      expect(updatedNotifications).toMatchInlineSnapshot(`
        Array [
          Object {
            "__v": 0,
            "_id": "7d668f7e0c27b5a7efb389d1",
            "createdAt": 2020-06-15T10:00:00.000Z,
            "disputeId": "bbaeec62fed1fe8eff4bc127",
            "read": true,
            "type": "NewDisputeNotification",
            "userId": "twitterId",
          },
          Object {
            "__v": 0,
            "_id": "21e9e3abe71bfca0d079b28e",
            "createdAt": 2020-06-14T10:00:00.000Z,
            "disputeId": "bbaeec62fed1fe8eff4bc127",
            "read": true,
            "type": "NewDisputeNotification",
            "userId": "twitterId",
          },
          Object {
            "__v": 0,
            "_id": "c5371677b5fe86660b8c0399",
            "createdAt": 2020-06-16T10:00:00.000Z,
            "disputeId": "bbaeec62fed1fe8eff4bc127",
            "read": false,
            "type": "NewDisputeNotification",
            "userId": "twitterId",
          },
        ]
      `);
    });
  });
});

describe('mutation markNotificationsAsReadForDispute', () => {
  const markNotificationsAsReadForDisputeMutation = `
    mutation {
      markNotificationsAsReadForDispute(disputeId: "bbaeec62fed1fe8eff4bc127") {
        updatedNotification {
          id
          read
          __typename
        }
        notificationStatus {
          totalCountUnread
        }
      }
    }
  `;

  test('fails when unauthorized', async () => {
    const result = await request(app)
      .post('')
      .send({ query: markNotificationsAsReadForDisputeMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  describe('success', () => {
    let result: request.Response;
    let allNotifications: NotificationDocument[];

    beforeAll(async () => {
      await Promise.all([
        new mongoose.models.Subject(subject1).save(),
        new mongoose.models.NewDisputeNotification(
          newDisputeNotification1,
        ).save(),
        new mongoose.models.NewMessageNotification(
          newMessageNotification2,
        ).save(),
      ]);

      result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: markNotificationsAsReadForDisputeMutation })
        .expect(200);

      allNotifications = await mongoose.models.Notification.find().exec();
    });

    test('response correctly', () => {
      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "markNotificationsAsReadForDispute": Object {
            "notificationStatus": Object {
              "totalCountUnread": 0,
            },
            "updatedNotification": Array [
              Object {
                "__typename": "NewMessageNotification",
                "id": "76223877c0e3358899de3439",
                "read": true,
              },
              Object {
                "__typename": "NewDisputeNotification",
                "id": "7d668f7e0c27b5a7efb389d1",
                "read": true,
              },
            ],
          },
        }
      `);
    });

    test('updates notifications in database correctly', () => {
      expect(allNotifications).toMatchInlineSnapshot(`
        Array [
          Object {
            "__v": 0,
            "_id": "7d668f7e0c27b5a7efb389d1",
            "createdAt": 2020-06-15T10:00:00.000Z,
            "disputeId": "bbaeec62fed1fe8eff4bc127",
            "read": true,
            "type": "NewDisputeNotification",
            "userId": "twitterId",
          },
          Object {
            "__v": 0,
            "_id": "76223877c0e3358899de3439",
            "createdAt": 2020-06-15T10:00:00.000Z,
            "messageId": "7b6429574939a24fde1b7cb0",
            "read": true,
            "type": "NewMessageNotification",
            "userId": "twitterId",
          },
        ]
      `);
    });
  });

  test('success when no notification to update exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: markNotificationsAsReadForDisputeMutation })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "markNotificationsAsReadForDispute": Object {
          "notificationStatus": Object {
            "totalCountUnread": 0,
          },
          "updatedNotification": Array [],
        },
      }
    `);
  });
});

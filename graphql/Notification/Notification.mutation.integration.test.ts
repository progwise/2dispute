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
import { newDisputeNotification } from '../../testing/fixtures/notifications';
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
          newDisputeNotification,
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

    test('updates notification in database correcly', () => {
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

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
import { subject1 } from '../../testing/fixtures/subjects';

const user = {
  twitterId: 'twitterId',
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

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
});

describe('vote', () => {
  const voteMutation = `
    mutation {
      vote(messageId: "7b6429574939a24fde1b7cb0", voting: UP) {
        id
        votes {
          ups
          downs
          userVoting
        }
      }
    }
  `;

  test('fails when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: voteMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('fails when message id not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: voteMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('message not found');
  });

  describe('success', () => {
    test.each`
      vote      | ups  | downs
      ${'UP'}   | ${1} | ${0}
      ${'DOWN'} | ${0} | ${1}
      ${'NONE'} | ${0} | ${0}
    `('correct response on $vote', async ({ vote, ups, downs }) => {
      await new mongoose.models.Subject(subject1).save();

      const voteMutation = `
        mutation {
          vote(messageId: "7b6429574939a24fde1b7cb0", voting: ${vote}) {
            votes {
              ups
              downs
              userVoting
            }
          }
        }
      `;

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: voteMutation })
        .expect(200);

      expect(result.body.errors).toBeUndefined();
      expect(result.body.data.vote).toEqual({
        votes: {
          ups,
          downs,
          userVoting: vote,
        },
      });
    });
  });
});

describe('editMessage', () => {
  const editMessageMutation = `
    mutation {
      editMessage(messageId: "33c6dd9d4571877fdb4baa0c", text: "New Message") {
        id
        text
      }
    }
  `;

  test('returns error when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: editMessageMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('not authenticated');
    expect(result.body.data).toBeNull();
  });

  test('returns error when message not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: editMessageMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('message not found');
    expect(result.body.data).toBeNull();
  });

  test('returns error when user is not message author', async () => {
    await new mongoose.models.Subject(subject1).save();

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: editMessageMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('user not message author');
    expect(result.body.data).toBeNull();
  });

  test('updates normal message successfully', async () => {
    await new mongoose.models.Subject(subject1).save();

    const user = {
      twitterId: '2',
      accessToken: {
        oauth_token: 'oauth_token',
        oauth_token_secret: 'oauth_token_secret',
      },
    };

    const token = jwt.sign(user, process.env.JWT_SECRET ?? '');
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: editMessageMutation })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "editMessage": Array [
          Object {
            "id": "33c6dd9d4571877fdb4baa0c",
            "text": "New Message",
          },
        ],
      }
    `);

    const updatedSubjectFromDB = await mongoose.models.Subject.findById(
      '123456789012345678901234',
    ).exec();

    expect(updatedSubjectFromDB?.disputes[0].messages[1]).toMatchObject({
      text: 'New Message',
    });
  });

  describe('edit first messages', () =>
    test.each`
      type         | messageId
      ${`subject`} | ${`123456789012345678901234`}
      ${`dispute`} | ${`7b6429574939a24fde1b7cb0`}
    `('updates first message on $type successfully', async ({ messageId }) => {
      const editMessageMutationFirstMessage = `
        mutation editMessage($messageId: ID!) {
          editMessage(messageId: $messageId, text: "New Message") {
            id
            text
          }
        }
      `;

      await new mongoose.models.Subject(subject1).save();

      const user = {
        twitterId: '1',
        accessToken: {
          oauth_token: 'oauth_token',
          oauth_token_secret: 'oauth_token_secret',
        },
      };

      const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

      const result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({
          query: editMessageMutationFirstMessage,
          variables: { messageId },
        })
        .expect(200);

      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "editMessage": Array [
            Object {
              "id": "123456789012345678901234",
              "text": "New Message",
            },
            Object {
              "id": "7b6429574939a24fde1b7cb0",
              "text": "New Message",
            },
          ],
        }
      `);

      const updatedSubjectFromDB = await mongoose.models.Subject.findById(
        '123456789012345678901234',
      ).exec();

      expect(updatedSubjectFromDB?.firstMessage).toBe('New Message');
      expect(updatedSubjectFromDB?.disputes[0].messages[0]).toMatchObject({
        text: 'New Message',
      });
    }));
});

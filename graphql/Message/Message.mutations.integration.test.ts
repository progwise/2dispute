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

/* eslint-disable @typescript-eslint/camelcase */

import http from 'http';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import Twitter from 'twitter-lite';
import createTestServer from '../../utils/testing/createTestServer';
import { closeConnection } from '../mongoose';

jest.mock('twitter-lite');
const MockedTwitter = (Twitter as unknown) as jest.Mock;

let app: http.Server;

beforeAll(() => (app = createTestServer()));

afterAll(async () => {
  await closeConnection();
  app.close();
});

const twitterTimelineQuery = `
  { 
    twitterTimeline {
      id
      link
    }
  }
`;

test('twitterTimeline returns null when unauthenticated', async () => {
  const result = await request(app)
    .post('')
    .send({ query: twitterTimelineQuery })
    .expect(200);

  expect(result.body).toEqual({ data: { twitterTimeline: null } });
});

test('twitterTimeline returns tweets when authenticated', async () => {
  const tweets = [
    { id_str: '1', user: { screen_name: '2dispute' } },
    { id_str: '2', user: { screen_name: 'Twitter' } },
  ];
  const twitterGetMethod = jest.fn().mockReturnValue(tweets);
  MockedTwitter.mockReturnValue({ get: twitterGetMethod });

  const user = {
    accessToken: {
      oauth_token: 'oauth_token',
      oauth_token_secret: 'oauth_token_secret',
    },
  };
  const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

  const result = await request(app)
    .post('')
    .set('Cookie', [`token=${token}`])
    .send({ query: twitterTimelineQuery })
    .expect(200);

  expect(Twitter).toHaveBeenCalledWith({
    consumer_key: 'TWITTER_CONSUMER_KEY',
    consumer_secret: 'TWITTER_CONSUMER_SECRET',
    access_token_key: 'oauth_token',
    access_token_secret: 'oauth_token_secret',
  });
  expect(twitterGetMethod).toHaveBeenCalledTimes(1);

  expect(result.body).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "twitterTimeline": Array [
          Object {
            "id": "1",
            "link": "https://twitter.com/2dispute/status/1",
          },
          Object {
            "id": "2",
            "link": "https://twitter.com/Twitter/status/2",
          },
        ],
      },
    }
  `);
});

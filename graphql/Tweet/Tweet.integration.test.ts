/* eslint-disable @typescript-eslint/camelcase */

import http from 'http';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import Twitter from 'twitter-lite';
import createTestServer from '../../utils/testing/createTestServer';
import { closeConnection } from '../mongoose';

jest.mock('twitter-lite');
const MockedTwitter = (Twitter as unknown) as jest.Mock;

const tweets = [
  { id_str: '1', user: { screen_name: '2dispute' } },
  { id_str: '2', user: { screen_name: 'Twitter' } },
];

const twitterGetMethod = jest.fn().mockReturnValue(tweets);
MockedTwitter.mockReturnValue({ get: twitterGetMethod });

let app: http.Server;

beforeAll(() => (app = createTestServer()));

afterEach(() => jest.clearAllMocks());

afterAll(async () => {
  await closeConnection();
  app.close();
});

const twitterTimelineQuery = `
  { 
    twitterTimeline {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          link
        }
      }
    }
  }
`;

const user = {
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

test('twitterTimeline returns null when unauthenticated', async () => {
  const result = await request(app)
    .post('')
    .send({ query: twitterTimelineQuery })
    .expect(200);

  expect(result.body).toEqual({ data: { twitterTimeline: null } });
});

test('twitterTimeline returns tweets when authenticated', async () => {
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
  expect(twitterGetMethod).toHaveBeenCalledWith('statuses/home_timeline', {
    count: 200,
    include_entities: false,
  });

  expect(result.body).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "twitterTimeline": Object {
          "edges": Array [
            Object {
              "cursor": "1",
              "node": Object {
                "id": "1",
                "link": "https://twitter.com/2dispute/status/1",
              },
            },
            Object {
              "cursor": "2",
              "node": Object {
                "id": "2",
                "link": "https://twitter.com/Twitter/status/2",
              },
            },
          ],
          "pageInfo": Object {
            "endCursor": "2",
            "hasNextPage": true,
            "hasPreviousPage": true,
            "startCursor": "1",
          },
        },
      },
    }
  `);
});

test('twitterTimeline with after args', async () => {
  const queryWithAfterArgs = `
    { 
      twitterTimeline(after: "1") {
        edges {
          node {
            id
            link
          }
        }
      }
    }
  `;

  const result = await request(app)
    .post('')
    .set('Cookie', [`token=${token}`])
    .send({ query: queryWithAfterArgs })
    .expect(200);

  expect(Twitter).toHaveBeenCalledWith({
    consumer_key: 'TWITTER_CONSUMER_KEY',
    consumer_secret: 'TWITTER_CONSUMER_SECRET',
    access_token_key: 'oauth_token',
    access_token_secret: 'oauth_token_secret',
  });
  expect(twitterGetMethod).toHaveBeenCalledTimes(1);
  expect(twitterGetMethod).toHaveBeenCalledWith('statuses/home_timeline', {
    count: 200,
    include_entities: false,
    max_id: '1',
  });

  expect(result.body).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "twitterTimeline": Object {
          "edges": Array [
            Object {
              "node": Object {
                "id": "2",
                "link": "https://twitter.com/Twitter/status/2",
              },
            },
          ],
        },
      },
    }
  `);
});

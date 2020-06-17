/* eslint-disable @typescript-eslint/camelcase */

import http from 'http';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import createTestServer from '../../utils/testing/createTestServer';
import { closeConnection } from '../mongoose';
import getTwitterUserById from './getTwitterUserById';

jest.mock('./getTwitterUserById');
const mockedGetTwitterUserById = (getTwitterUserById as unknown) as jest.Mock;

let app: http.Server;

beforeAll(() => (app = createTestServer()));

afterAll(async () => {
  await closeConnection();
  app.close();
});

afterEach(() => jest.clearAllMocks());

describe('me query', () => {
  const meQuery = `
  {
    me {
      id
      name
      picture
      allSubjects {
        edges {
          node {
            id
          }
        }
      }
      allDisputes {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `;

  test('me query returns null when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: meQuery })
      .expect(200);

    expect(result.body).toEqual({ data: { me: null } });

    expect(true).toBeTruthy();
  });

  test('me query returns user when authenticated', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: 'twitterId',
      name: 'User name',
      picture: 'picture url',
    });

    const user = {
      twitterId: 'twitterId',
      accessToken: {
        oauth_token: 'oauth_token',
        oauth_token_secret: 'oauth_token_secret',
      },
    };
    const token = jwt.sign(user, process.env.JWT_SECRET ?? '');

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: meQuery })
      .expect(200);

    expect(mockedGetTwitterUserById).toHaveBeenCalledWith('twitterId');

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "me": Object {
            "allDisputes": Object {
              "edges": Array [],
            },
            "allSubjects": Object {
              "edges": Array [],
            },
            "id": "twitterId",
            "name": "User name",
            "picture": "picture url",
          },
        },
      }
    `);
  });
});

describe('user query', () => {
  const userQuery = `
  {
    user(id: "userId") {
      id
      name
      picture
    }
  }
  `;

  test('user query returns null when the user not exists', async () => {
    mockedGetTwitterUserById.mockRejectedValue(new Error('user not found'));

    const result = await request(app)
      .post('')
      .send({ query: userQuery })
      .expect(200);

    expect(mockedGetTwitterUserById).toHaveBeenCalledWith('userId');
    expect(result.body.data.user).toBeNull();
  });

  test('user query returns user when the user exists', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: 'userId',
      name: 'User name',
      picture: 'picture url',
    });

    const result = await request(app)
      .post('')
      .send({ query: userQuery })
      .expect(200);

    expect(mockedGetTwitterUserById).toHaveBeenCalledWith('userId');

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "user": Object {
            "id": "userId",
            "name": "User name",
            "picture": "picture url",
          },
        },
      }
    `);
  });
});

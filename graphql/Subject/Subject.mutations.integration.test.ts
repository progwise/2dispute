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
import getTwitterUserById from '../User/getTwitterUserById';
import { subject2 } from '../../testing/fixtures/subjects';
import { SubjectDocument } from './SubjectSchema';

jest.mock('../User/getTwitterUserById');
const mockedGetTwitterUserById = (getTwitterUserById as unknown) as jest.Mock;

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

beforeEach(async () => {
  await mongoose.models.Subject.deleteMany({}).exec();
  jest.resetAllMocks();
});

describe('createSubject mutation', () => {
  const createSubjectMutation = `
    mutation {
      createSubject(
        input: {
          subject: "New Subject"
          firstMessage: "first message"
          tweetId: "https://twitter.com/jack/status/20"
        }
      ) {
        subject
        tweetId
        firstMessage {
          text
        }
        author {
          id
          name
        }
      }
    }
  `;

  test('unauthorized mutation', async () => {
    const result = await request(app)
      .post('')
      .send({ query: createSubjectMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
  });

  test('successful createSubject mutation', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: '1',
      name: 'User 1',
    });

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: createSubjectMutation })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "createSubject": Object {
            "author": Object {
              "id": "1",
              "name": "User 1",
            },
            "firstMessage": Object {
              "text": "first message",
            },
            "subject": "New Subject",
            "tweetId": "https://twitter.com/jack/status/20",
          },
        },
      }
    `);
  });
});

describe('replyOnSubject mutation', () => {
  const replyOnSubjectMutation = `
    mutation {
      replyOnSubject(input: {subjectId: "81c408836fc2e528e7ed82f3", message: "reply message"}) {
        subject {
          id
        }
        messages {
          text
        }
      }
    }
  `;

  test('calling replyOnSubject on unauthorized fails', async () => {
    const result = await request(app)
      .post('')
      .send({ query: replyOnSubjectMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('calling replyOnSubject on not existing subject fails', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: replyOnSubjectMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('Subject not found');
  });

  describe('calling replyOnSubject successful', () => {
    let result: request.Response;
    let updatedSubject: SubjectDocument | null;

    beforeAll(async () => {
      await new mongoose.models.Subject(subject2).save();

      result = await request(app)
        .post('')
        .set('Cookie', [`token=${token}`])
        .send({ query: replyOnSubjectMutation })
        .expect(200);

      updatedSubject = await mongoose.models.Subject.findById(
        '81c408836fc2e528e7ed82f3',
      ).exec();
    });

    test('response is correct', () => {
      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "replyOnSubject": Object {
            "messages": Array [
              Object {
                "text": "In my opinion",
              },
              Object {
                "text": "reply message",
              },
            ],
            "subject": Object {
              "id": "81c408836fc2e528e7ed82f3",
            },
          },
        }
      `);
    });

    test('subject has a new dispute in database', () => {
      expect(updatedSubject?.disputes).toHaveLength(1);
      expect(updatedSubject?.disputes[0].messages[0]).toMatchObject({
        authorId: '1',
        text: 'In my opinion',
      });
      expect(updatedSubject?.disputes[0].messages[1]).toMatchObject({
        authorId: 'twitterId',
        text: 'reply message',
      });
    });
  });
});

describe('editSubjectTitle', () => {
  const editSubjectTitleMutation = `
    mutation {
      editSubjectTitle(subjectId: "81c408836fc2e528e7ed82f3", title: "New Title") {
        id
        subject
      }
    }
  `;

  test('returns error when unauthenticated', async () => {
    const result = await request(app)
      .post('')
      .send({ query: editSubjectTitleMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('not authenticated');
    expect(result.body.data).toBeNull();
  });

  test('returns error when subject not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: editSubjectTitleMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('subject not found');
    expect(result.body.data).toBeNull();
  });

  test('returns error when user is not subject creator', async () => {
    await new mongoose.models.Subject(subject2).save();

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${token}`])
      .send({ query: editSubjectTitleMutation })
      .expect(200);

    expect(result.body.errors[0].message).toBe('user is not subject creator');
    expect(result.body.data).toBeNull();
  });

  test('updates successfully', async () => {
    await new mongoose.models.Subject(subject2).save();

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
      .send({ query: editSubjectTitleMutation })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "editSubjectTitle": Object {
            "id": "81c408836fc2e528e7ed82f3",
            "subject": "New Title",
          },
        },
      }
    `);

    const updatedSubjectFromDB = await mongoose.models.Subject.findById(
      '81c408836fc2e528e7ed82f3',
    );
    expect(updatedSubjectFromDB).toMatchObject({ subject: 'New Title' });
  });
});

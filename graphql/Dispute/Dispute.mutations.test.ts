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
import { SubjectDocument } from '../Subject/SubjectSchema';

let app: http.Server;
let mongoose: MongooseHelper;

const userVisitor = {
  twitterId: 'twitterId',
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const userPartner = {
  twitterId: '2',
  accessToken: {
    oauth_token: 'oauth_token',
    oauth_token_secret: 'oauth_token_secret',
  },
};
const tokenVisitor = jwt.sign(userVisitor, process.env.JWT_SECRET ?? '');
const tokenPartner = jwt.sign(userPartner, process.env.JWT_SECRET ?? '');

beforeAll(async () => {
  app = createTestServer();
  mongoose = await getMongooseHelper();
});

afterAll(async () => {
  await closeConnection();
  app.close();
});

afterEach(async () => mongoose.models.Subject.deleteMany({}).exec());

describe('replyOnDispute mutations', () => {
  const replayOnDisputeMutation = `
    mutation {
      replyOnDispute(input: { disputeId: "bbaeec62fed1fe8eff4bc127", message:"New message"}) {
        id
        messages {
          text
        }
      }
    }
  `;

  test('fail when unauthorized', async () => {
    const result = await request(app)
      .post('')
      .send({ query: replayOnDisputeMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('not authenticated');
  });

  test('fail when dispute not exists', async () => {
    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${tokenVisitor}`])
      .send({ query: replayOnDisputeMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('Dispute not found');
  });

  test('fail when user is not dispute partner', async () => {
    await new mongoose.models.Subject(subject1).save();

    const result = await request(app)
      .post('')
      .set('Cookie', [`token=${tokenVisitor}`])
      .send({ query: replayOnDisputeMutation })
      .expect(200);

    expect(result.body.data).toBeNull();
    expect(result.body.errors).toHaveLength(1);
    expect(result.body.errors[0].message).toBe('User is not a dispute partner');
  });

  describe('successful', () => {
    let result: request.Response;
    let updatedSubject: SubjectDocument | null;

    beforeAll(async () => {
      await new mongoose.models.Subject(subject1).save();

      result = await request(app)
        .post('')
        .set('Cookie', [`token=${tokenPartner}`])
        .send({ query: replayOnDisputeMutation })
        .expect(200);

      updatedSubject = await mongoose.models.Subject.findById(
        '123456789012345678901234',
      ).exec();
    });

    test('response is correct', async () => {
      expect(result.body.errors).toBeUndefined();
      expect(result.body.data).toMatchInlineSnapshot(`
        Object {
          "replyOnDispute": Object {
            "id": "bbaeec62fed1fe8eff4bc127",
            "messages": Array [
              Object {
                "text": "In my opinion",
              },
              Object {
                "text": "reply message",
              },
              Object {
                "text": "New message",
              },
            ],
          },
        }
      `);
    });

    test('dispute has a new message in database', () => {
      const messages = updatedSubject?.disputes[0].messages;
      expect(messages).toHaveLength(3);
      expect(messages?.[2]).toMatchObject({
        authorId: '2',
        text: 'New message',
      });
    });
  });
});

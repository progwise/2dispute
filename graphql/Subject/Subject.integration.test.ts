import http from 'http';
import request from 'supertest';
import createTestServer from '../../utils/testing/createTestServer';
import {
  closeConnection,
  getMongooseHelper,
  MongooseHelper,
} from '../mongoose';
import { subject1 } from '../../testing/fixtures/subjects';
import getTwitterUserById from '../User/getTwitterUserById';

jest.mock('../User/getTwitterUserById');
const mockedGetTwitterUserById = (getTwitterUserById as unknown) as jest.Mock;

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

describe('query subject', () => {
  const subjectQuery = `
    {
      subject(id: "123456789012345678901234") {
        id
        subject
        disputes {
          id
          createdAt
        }
        hasDisputes
        firstMessage {
          text
        }
        author {
          id
        }
      }
    }
  `;

  test('subject query returns null when subject not exists', async () => {
    const result = await request(app)
      .post('')
      .send({ query: subjectQuery })
      .expect(200);

    expect(result.body.data.subject).toBeNull();
    expect(result.body.errors).toBeUndefined();
  });

  test('subject returns subject when exists', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: '1',
      name: 'User1',
    });

    await new mongoose.models.Subject(subject1).save();

    const result = await request(app)
      .post('')
      .send({ query: subjectQuery })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "subject": Object {
            "author": Object {
              "id": "1",
            },
            "disputes": Array [
              Object {
                "createdAt": "2020-06-15T11:00:00.000Z",
                "id": "a17456a1410c7fb7ed325372",
              },
              Object {
                "createdAt": "2020-06-15T10:00:00.000Z",
                "id": "bbaeec62fed1fe8eff4bc127",
              },
            ],
            "firstMessage": Object {
              "text": "In my opinion",
            },
            "hasDisputes": true,
            "id": "123456789012345678901234",
            "subject": "testSubject",
          },
        },
      }
    `);
    expect(mockedGetTwitterUserById).toHaveBeenCalledWith('1');
  });
});

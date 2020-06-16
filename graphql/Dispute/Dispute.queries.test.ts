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

describe('query dispute', () => {
  const disputeQuery = `
      {
        dispute(id: "a17456a1410c7fb7ed325372") {
          id
          subject {
            id
          }
          partnerA {
            id
          }
          partnerB {
            id
          }
        }
      }
    `;

  test('returns null when dispute not exists', async () => {
    const result = await request(app)
      .post('')
      .send({ query: disputeQuery })
      .expect(200);

    expect(result.body.data.dispute).toBeNull();
    expect(result.body.errors).toBeUndefined();
  });

  test('returns when dispute exists', async () => {
    mockedGetTwitterUserById.mockResolvedValue({
      id: 'id',
      name: 'name',
    });

    await new mongoose.models.Subject(subject1).save();

    const result = await request(app)
      .post('')
      .send({ query: disputeQuery })
      .expect(200);

    expect(result.body.errors).toBeUndefined();
    expect(result.body.data).toMatchInlineSnapshot(`
      Object {
        "dispute": Object {
          "id": "a17456a1410c7fb7ed325372",
          "partnerA": Object {
            "id": "id",
          },
          "partnerB": Object {
            "id": "id",
          },
          "subject": Object {
            "id": "123456789012345678901234",
          },
        },
      }
    `);

    expect(mockedGetTwitterUserById).toBeCalledWith('1');
    expect(mockedGetTwitterUserById).toBeCalledWith('2');
  });
});
